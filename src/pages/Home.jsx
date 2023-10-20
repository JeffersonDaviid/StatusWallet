import { useState } from 'react';
import './home.css';
import Transaction from '../Components/Transaction/Transaction';
import ResumeTransaction from '../Components/ResumeTransaction/ResumeTransactions';

const Home = () => {
   const transactions = [
      {
         date: {
            dayName: 'Lunes',
            day: '24',
            month: 'Octubre',
            year: '2026',
         },
         totalDay: {
            income: '300',
            expenses: '0',
         },
         data: [
            {
               type: 'income',
               category: 'salario',
               amount: '300',
            },
            {
               type: 'expense',
               category: 'alquiler',
               amount: '100',
            },
            {
               type: 'expense',
               category: 'comida',
               amount: '50',
            },
         ],
      },
      {
         date: {
            dayName: 'Martes',
            day: '25',
            month: 'Octubre',
            year: '2026',
         },
         totalDay: {
            income: '250',
            expenses: '100',
         },
         data: [
            {
               type: 'income',
               category: 'comida',
               amount: '250',
            },
            {
               type: 'expense',
               category: 'renta',
               amount: '500',
            },
            {
               type: 'income',
               category: 'comida',
               amount: '12.25',
            },
         ],
      },
      {
         date: {
            dayName: 'Miércoles',
            day: '26',
            month: 'Octubre',
            year: '2026',
         },
         totalDay: {
            income: '400',
            expenses: '200',
         },
         data: [
            {
               type: 'income',
               category: 'salario',
               amount: '400',
            },
            {
               type: 'expense',
               category: 'alquiler',
               amount: '150',
            },
            {
               type: 'expense',
               category: 'comida',
               amount: '50',
            },
         ],
      },
      {
         date: {
            dayName: 'Jueves',
            day: '27',
            month: 'Octubre',
            year: '2026',
         },
         totalDay: {
            income: '350',
            expenses: '180',
         },
         data: [
            {
               type: 'income',
               category: 'salario',
               amount: '350',
            },
            {
               type: 'expense',
               category: 'alquiler',
               amount: '130',
            },
            {
               type: 'expense',
               category: 'comida',
               amount: '50',
            },
         ],
      },
      {
         date: {
            dayName: 'Viernes',
            day: '28',
            month: 'Octubre',
            year: '2026',
         },
         totalDay: {
            income: '280',
            expenses: '120',
         },
         data: [
            {
               type: 'income',
               category: 'salario',
               amount: '280',
            },
            {
               type: 'expense',
               category: 'alquiler',
               amount: '100',
            },
            {
               type: 'expense',
               category: 'comida',
               amount: '50',
            },
         ],
      },
      {
         date: {
            dayName: 'Sábado',
            day: '29',
            month: 'Octubre',
            year: '2026',
         },
         totalDay: {
            income: '320',
            expenses: '160',
         },
         data: [
            {
               type: 'income',
               category: 'salario',
               amount: '320',
            },
            {
               type: 'expense',
               category: 'alquiler',
               amount: '110',
            },
            {
               type: 'expense',
               category: 'comida',
               amount: '50',
            },
         ],
      },
      {
         date: {
            dayName: 'Domingo',
            day: '30',
            month: 'Octubre',
            year: '2026',
         },
         totalDay: {
            income: '280',
            expenses: '140',
         },
         data: [
            {
               type: 'income',
               category: 'salario',
               amount: '280',
            },
            {
               type: 'expense',
               category: 'alquiler',
               amount: '100',
            },
            {
               type: 'expense',
               category: 'comida',
               amount: '40',
            },
         ],
      },
      {
         date: {
            dayName: 'Lunes',
            day: '31',
            month: 'Octubre',
            year: '2026',
         },
         totalDay: {
            income: '320',
            expenses: '160.6',
         },
         data: [
            {
               type: 'income',
               category: 'salario',
               amount: '320',
            },
            {
               type: 'expense',
               category: 'alquiler',
               amount: '110',
            },
            {
               type: 'expense',
               category: 'comida',
               amount: '50',
            },
         ],
      },
   ];

   const calculateResumeIncomes = () => {
      const totalIncomes = transactions.reduce((total, operation) => {
         return total + parseFloat(operation.totalDay.income);
      }, 0);

      return totalIncomes.toFixed(2); // Para obtener el resultado con 2 decimales
   };

   const calculateResumeExpenses = () => {
      const totalExpenses = transactions.reduce((total, operation) => {
         return total + parseFloat(operation.totalDay.expenses);
      }, 0);

      return totalExpenses.toFixed(2); // Para obtener el resultado con 2 decimales
   };

   const [resumenTransactions, setResumenTransactions] = useState({
      incomes: calculateResumeIncomes(),
      expenses: calculateResumeExpenses(),
      date: transactions[0].date.month.slice(0, 3) + ', ' + transactions[0].date.year,
   });

   console.log(resumenTransactions);
   return (
      <div className='home'>
         <h3>hola</h3>
         <h3>ahola</h3>
         <h3>aho</h3>

         <ResumeTransaction resume={resumenTransactions} />
         <div className='listMonth-transaction'>
            {transactions.map((item, key) => {
               return (
                  <Transaction
                     transaction={item}
                     key={key}
                  />
               );
            })}
         </div>
      </div>
   );
};

export default Home;
