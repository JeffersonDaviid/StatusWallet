import { useState, createContext, useEffect } from 'react'

export const TransactionContext = createContext()

export const TransactionContextProvider = ({ children }) => {
  const [totalMoney, setTotalMoney] = useState({ wallet: 0, bank: 0 })
  const [resumenTransactions, setResumenTransactions] = useState({})
  const [lsTransaction, setLsTransaction] = useState(
    JSON.parse(localStorage.getItem('registro'))
  )

  const handleSetNewTransaction = (newTransaction) => {
    let newLsTransaction = lsTransaction
    const indexDay = findIndexOfTransaction(newTransaction)
    const transaction = {
      type: newTransaction.type,
      category: newTransaction.category,
      amount: newTransaction.amount,
      description: newTransaction.description,
      destination: newTransaction.destination,
    }

    // Si la fecha esta en la lista solo actualiza y agrega
    if (indexDay !== -1) {
      newLsTransaction[indexDay].data.push(transaction)
      newLsTransaction[indexDay].totalDay = {
        incomes: calculateResumeAmountDay('income', indexDay),
        expenses: calculateResumeAmountDay('expense', indexDay),
      }
    } else {
      // Si la fecha NO esta en la lista agrega

      let totalDay
      if (transaction.type === 'income') {
        totalDay = {
          incomes: transaction.amount,
          expenses: 0,
        }
      }
      if (transaction.type === 'expense') {
        totalDay = {
          incomes: 0,
          expenses: transaction.amount,
        }
      }

      // Si la lista NO esta vacia
      if (newLsTransaction !== null) {
        newLsTransaction.push({
          date: newTransaction.date,
          totalDay,
          data: [transaction],
        })
      } else {
        // Si la lista esta vacia
        newLsTransaction = [
          {
            date: newTransaction.date,
            totalDay,
            data: [transaction],
          },
        ]
      }
    }

    newLsTransaction.sort(function (a, b) {
      if (parseInt(a.date.day) < parseInt(b.date.day)) {
        return 1
      }
      if (parseInt(a.date.day) > parseInt(b.date.day)) {
        return -1
      }
      // a must be equal to b
      return 0
    })

    setLsTransaction(newLsTransaction)
    localStorage.setItem('registro', JSON.stringify(newLsTransaction))

    updateResumeTrasactions()
    updateTotalMoney(transaction)
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

  const calculateResumeAmountDay = (type, index) => {
    const lsFiltered = lsTransaction[index].data.filter((data) => data.type === type)

    const total = lsFiltered.reduce((total, data) => {
      return total + parseFloat(data.amount)
    }, 0)

    return total.toFixed(2) // Para obtener el resultado con 2 decimales
  }

  const calculateResumeAmount = (type) => {
    let total = 0
    if (type === 'incomes') {
      total = lsTransaction.reduce((total, operation) => {
        return total + parseFloat(operation.totalDay.incomes)
      }, 0)
    }

    if (type === 'expenses') {
      total = lsTransaction.reduce((total, operation) => {
        return total + parseFloat(operation.totalDay.expenses)
      }, 0)
    }

    return parseFloat(total.toFixed(2)) // Para obtener el resultado con 2 decimales
  }

  const updateResumeTrasactions = () => {
    if (lsTransaction !== null) {
      setResumenTransactions({
        incomes: calculateResumeAmount('incomes'),
        expenses: calculateResumeAmount('expenses'),
        date: lsTransaction[0].date.month.slice(0, 3) + ', ' + lsTransaction[0].date.year,
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
    updateResumeTrasactions()

    const totalCashInMemory = JSON.parse(localStorage.getItem('totalMoney'))
    if (totalCashInMemory !== null) {
      setTotalMoney(totalCashInMemory)
    }
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        lsTransaction,
        resumenTransactions,
        totalMoney,

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
  console.log(currentDate)
  return currentDate.toISOString().split('T')[0]
}
const getTodayMonthYear = () => {
  let currentDate = new Date()
  currentDate.setUTCHours(currentDate.getUTCHours() - 5) // Ecuador está en UTC-5
  currentDate = currentDate.toISOString().split('T')[0]
  return currentDate.substring(0, 7)
}
