import { useState, createContext, useEffect } from 'react'
import { useAlert } from './AlertContext'

export const TransactionContext = createContext()

export const TransactionContextProvider = ({ children }) => {
  const { showAlert } = useAlert()

  const [totalMoney, setTotalMoney] = useState(
    JSON.parse(localStorage.getItem('totalMoney')) || { bank: 0, wallet: 0 }
  )
  const [resumenTransactions, setResumenTransactions] = useState({
    incomes: 0,
    expenses: 0,
    date:
      dateConverter(getTodayDate()).month.slice(0, 3) +
      ', ' +
      dateConverter(getTodayDate()).year,
  })
  const [lsTransaction, setLsTransaction] = useState(
    JSON.parse(localStorage.getItem('registro')) || []
  )
  const [lsTransactionFiltered, setLsTransactionFiltered] = useState([])
  const [dateForFilter, setDateForFilter] = useState(getTodayMonthYear())

  // const handleSetNewTransaction = (newTransaction) => {
  //   let newLsTransaction = lsTransaction
  //   const indexDay = findIndexOfTransaction(newTransaction)
  //   const transaction = {
  //     type: newTransaction.type,
  //     category: newTransaction.category,
  //     amount: newTransaction.amount,
  //     description: newTransaction.description,
  //     destination: newTransaction.destination,
  //   }

  //   // Si la fecha esta en la lista solo actualiza y agrega
  //   if (indexDay !== -1) {
  //     newLsTransaction[indexDay].data.push(transaction)
  //     newLsTransaction[indexDay].totalDay = {
  //       incomes: calculateResumeAmountDay('income', indexDay),
  //       expenses: calculateResumeAmountDay('expense', indexDay),
  //     }
  //   } else {
  //     // Si la fecha NO esta en la lista agrega

  //     let totalDay
  //     if (transaction.type === 'income') {
  //       totalDay = {
  //         incomes: transaction.amount,
  //         expenses: 0,
  //       }
  //     }
  //     if (transaction.type === 'expense') {
  //       totalDay = {
  //         incomes: 0,
  //         expenses: transaction.amount,
  //       }
  //     }

  //     // Si la lista NO esta vacia
  //     if (newLsTransaction !== null) {
  //       newLsTransaction.push({
  //         date: newTransaction.date,
  //         totalDay,
  //         data: [transaction],
  //       })
  //     } else {
  //       // Si la lista esta vacia
  //       newLsTransaction = [
  //         {
  //           date: newTransaction.date,
  //           totalDay,
  //           data: [transaction],
  //         },
  //       ]
  //     }
  //   }

  //   newLsTransaction.sort(function (a, b) {
  //     if (parseInt(a.date.day) < parseInt(b.date.day)) {
  //       return 1
  //     }
  //     if (parseInt(a.date.day) > parseInt(b.date.day)) {
  //       return -1
  //     }
  //     // a must be equal to b
  //     return 0
  //   })

  //   setLsTransaction(newLsTransaction)
  //   localStorage.setItem('registro', JSON.stringify(newLsTransaction))

  //   updateResumeTransactions()
  //   updateTotalMoney(transaction)
  // }

  const handleSetNewTransaction = (newTransaction) => {
    console.log(newTransaction)
    try {
      const updatedTransactions = updateTransactions(newTransaction)
      setLsTransaction(updatedTransactions)

      updateResumeTransactions()
      updateTotalMoney(newTransaction)
      showAlert('Transaccion realizada con éxito')
    } catch (error) {
      console.error('Error al procesar la transacción', error)
    }
  }

  const updateTransactions = (newTransaction) => {
    let updatedTransactions = [...lsTransaction]
    const indexDay = findIndexOfTransaction(newTransaction)
    const { type, category, amount, description, destination, date } = newTransaction

    // Crea un objeto de transacción para la nueva transacción
    const transaction = {
      type,
      category,
      amount,
      description,
      destination,
    }

    // ... Lógica para actualizar las transacciones ...
    // Encuentra el índice de la transacción con la misma fecha
    if (indexDay !== -1) {
      const existingDay = updatedTransactions[indexDay]
      existingDay.data.push(transaction)

      // Actualiza el total del día
      existingDay.totalDay = {
        incomes:
          type === 'income'
            ? existingDay.totalDay.incomes + parseFloat(amount)
            : existingDay.totalDay.incomes,
        expenses:
          type === 'expense'
            ? existingDay.totalDay.expenses + parseFloat(amount)
            : existingDay.totalDay.expenses,
      }
    } else {
      // Si la fecha NO está en la lista, crea un nuevo día de transacción
      const totalDay = {
        incomes: type === 'income' ? parseFloat(amount) : 0,
        expenses: type === 'expense' ? parseFloat(amount) : 0,
      }

      // Crea un nuevo día de transacción y agrégalo a la lista
      const newDayTransaction = {
        date,
        totalDay,
        data: [transaction],
      }

      updatedTransactions.push(newDayTransaction)
    }
    // Ordenar las transacciones en orden descendente
    updatedTransactions.sort(function (a, b) {
      if (parseInt(a.date.day) < parseInt(b.date.day)) {
        return 1
      }
      if (parseInt(a.date.day) > parseInt(b.date.day)) {
        return -1
      }
      // a must be equal to b
      return 0
    })

    localStorage.setItem('registro', JSON.stringify(updatedTransactions))

    return updatedTransactions
  }

  const findIndexOfTransaction = (newTransaction) => {
    if (lsTransaction !== null) {
      return lsTransaction.findIndex((transaction) => {
        const { day, dayName, month, year } = transaction.date
        const {
          day: newDay,
          dayName: newDayName,
          month: newMonth,
          year: newYear,
        } = newTransaction.date

        return (
          day === newDay &&
          dayName === newDayName &&
          month === newMonth &&
          year === newYear
        )
      })
    } else return -1
  }

  // const calculateResumeAmountDay = (type, index) => {
  //   const lsFiltered = lsTransaction[index].data.filter((data) => data.type === type)

  //   const total = lsFiltered.reduce((total, data) => {
  //     return total + parseFloat(data.amount)
  //   }, 0)

  //   return total.toFixed(2) // Para obtener el resultado con 2 decimales
  // }

  const calculateResumeAmount = (type) => {
    let total = 0
    if (type === 'incomes') {
      total = lsTransactionFiltered.reduce((total, operation) => {
        return total + parseFloat(operation.totalDay.incomes)
      }, 0)
    }

    if (type === 'expenses') {
      total = lsTransactionFiltered.reduce((total, operation) => {
        return total + parseFloat(operation.totalDay.expenses)
      }, 0)
    }

    return parseFloat(total.toFixed(2)) // Para obtener el resultado con 2 decimales
  }

  /**
   * Funcion principal para calcular el total de trasacciones realizadas en el mes fijado
   */
  const updateResumeTransactions = () => {
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ]
    const date = {
      year: dateForFilter.substring(0, 4),
      month: dateForFilter.substring(5, 7),
    }

    if (lsTransactionFiltered.length !== 0) {
      setResumenTransactions({
        incomes: calculateResumeAmount('incomes'),
        expenses: calculateResumeAmount('expenses'),
        date:
          lsTransactionFiltered[0].date.month.slice(0, 3) +
          ', ' +
          lsTransactionFiltered[0].date.year,
      })
    } else {
      setResumenTransactions({
        incomes: 0,
        expenses: 0,
        date: meses[parseInt(date.month) - 1].slice(0, 3) + ', ' + date.year,
      })
    }
  }

  const updateTotalMoney = (transaction) => {
    let newTotal

    if (transaction.type === 'income') {
      if (transaction.destination === 'wallet') {
        newTotal = {
          ...totalMoney,
          [transaction.destination]: totalMoney.wallet + parseFloat(transaction.amount),
        }
      } else {
        newTotal = {
          ...totalMoney,
          [transaction.destination]: totalMoney.bank + parseFloat(transaction.amount),
        }
      }
    }
    if (transaction.type === 'expense') {
      if (transaction.destination === 'wallet') {
        newTotal = {
          ...totalMoney,
          [transaction.destination]: totalMoney.wallet - parseFloat(transaction.amount),
        }
      } else {
        newTotal = {
          ...totalMoney,
          [transaction.destination]: totalMoney.bank - parseFloat(transaction.amount),
        }
      }
    }

    localStorage.setItem('totalMoney', JSON.stringify(newTotal))
    setTotalMoney(newTotal)
  }

  useEffect(() => {
    const totalCashInMemory = JSON.parse(localStorage.getItem('totalMoney'))
    if (totalCashInMemory !== null) {
      setTotalMoney(totalCashInMemory)
    }
    // updateResumeTransactions()
  }, [])

  useEffect(() => {
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ]
    const date = {
      year: dateForFilter.substring(0, 4),
      month: dateForFilter.substring(5, 7),
    }

    let updatedLsTransactionFiltered = lsTransaction.filter((item) => {
      return (
        item.date.month === meses[parseInt(date.month) - 1] &&
        item.date.year === date.year
      )
    })

    setLsTransactionFiltered(updatedLsTransactionFiltered)
    console.log('ls app con ' + date.month, updatedLsTransactionFiltered)
  }, [dateForFilter])

  useEffect(() => {
    updateResumeTransactions()
  }, [lsTransactionFiltered])

  return (
    <TransactionContext.Provider
      value={{
        lsTransactionFiltered,
        resumenTransactions,
        totalMoney,
        dateForFilter,

        setDateForFilter,
        handleSetNewTransaction,
        dateConverter,
        getTodayDate,
        getTodayMonthYear,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

const dateConverter = (date) => {
  const partesFecha = date.split('-')
  const dia = partesFecha[2]
  const mes = partesFecha[1]
  const año = partesFecha[0]

  const fechaFormateada = new Date(`${mes}/${dia}/${año}`)
  const opciones = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  const fechaFinal = fechaFormateada.toLocaleDateString('es-ES', opciones)

  const partesFecha2 = fechaFinal.split(' ')

  const dateFinal = {
    dayName:
      partesFecha2[0].charAt(0).toUpperCase() +
      partesFecha2[0].substring(1, partesFecha2[0].length - 1),
    day: partesFecha2[1],
    month: partesFecha2[3].charAt(0).toUpperCase() + partesFecha2[3].substring(1, 10),
    year: partesFecha2[5],
  }
  // console.log(dateFinal);

  return dateFinal
}

const getTodayDate = () => {
  const currentDate = new Date()
  currentDate.setUTCHours(currentDate.getUTCHours() - 5) // Ecuador está en UTC-5
  return currentDate.toISOString().split('T')[0]
}
const getTodayMonthYear = () => {
  let currentDate = new Date()
  currentDate.setUTCHours(currentDate.getUTCHours() - 5) // Ecuador está en UTC-5
  currentDate = currentDate.toISOString().split('T')[0]
  return currentDate.substring(0, 7)
}
