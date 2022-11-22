/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
import { useQuery } from '@tanstack/react-query'
import { User, Money } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { axiosGetBalance } from '../../api/account'
import { axiosGetAllTransaction } from '../../api/transactions'
// import { useContextSelector } from 'use-context-selector'
import Header from '../../components/header/Header'
import { AuthContext } from '../../context/AuthProvider'
import { headerTableTransactions } from '../../helpers/headersTables'
// import { AuthContext } from '../../context/AuthProvider'
import { alertContext } from '../../context/AlertProvider/AlertContextProvider'
import useModal from '../../hooks/useModal'
import './home.css'
import { Link, useNavigate } from 'react-router-dom'
// import CreateTransaction from './components/CreateTransaction/CreateTransaction'

export default function Home() {
  const { accountId, username } = useContextSelector(
    AuthContext,
    (context) => context,
  )

  // const { changeAlertModalState, getAlertMessage } = useContext(alertContext)
  // const navigate = useNavigate()
  // const { isModalOpen, switchModalView } = useModal()
  const [filterType, setFilterType] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState([])
  const { data } = useQuery(['balance'], () =>
    axiosGetBalance({ id: accountId }),
  )
  const { data: result } = useQuery(['transaction'], () =>
    axiosGetAllTransaction({ id: accountId!, filter: '' }),
  )

  useEffect(() => {
    if (data) {
      setBalance(data.data.balance)
    }
  }, [data])

  useEffect(() => {
    if (result) {
      setTransactions(result.data.transactions)
    }
  }, [result])

  function tableFilters(item: any) {
    const filterByType = item.type
      .includes(filterType.toLowerCase())
    const filterByDate = item.created_at
      .includes(filterDate.toLowerCase())
    return filterByType && filterByDate
  }

  function formatDate(payload: string) {
    if (payload) {
      const data = payload.split('T')[0]
      const date = new Date(data)
      date.setDate(date.getDate() + 1)
      const dateFormatter = new Intl.DateTimeFormat('pt-BR')
      return dateFormatter.format(date)
    }
  }

  return (
    <div className="flex  flex-col">
      <Header />
      <div className="relative left-20 mx-auto flex items-center gap-2" >
          <input type="date" id="filterDate" name="filterDate" value={filterDate} onChange={(e) => setFilterDate(e.target.value)}/>
          <select id='filterType' name='filterType' value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value=""></option>
            <option value="cash-in">Cash-In</option>
            <option value="cash-out">Cash-Out</option>
          </select>
        </div>
      
      <main className="dashboard-container">
        <div className="account-container">
          <div className="container-info">
            <p className='account-icon'> <User /> Account</p>

            <p className='value-info'>{`${username}`}</p>
          </div>
          <div className="container-info">
            <p className='account-icon'> <Money weight="fill" /> Balance</p>

            <p className='value-info'> {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(balance)}</p>
          </div>
          <Link className="transfer-link" to="/transaction">
            Transferir
          </Link>
          
        </div>
        
        <div className="tableContainer relative left-2 flex gap-4 w-[70vw] max-h-[70vh] overflow-auto">
        
          <table className="table">
            
            <thead className="tableHead">
              <tr>
                {headerTableTransactions.map((item, index) => (
                  <th scope="col" key={index} className="tableLine">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <>
                {transactions.map((transaction, index) => {
                  if (tableFilters(transaction)) {

                  return (
                    <tr key={index} className="bg-white border-b ">
                      <td scope="row" className="tableLine">
                        {formatDate(transaction.created_at)}
                      </td>
                      <td className="tableLine text-center">
                        {transaction.type}
                      </td>
                      <td className="tableLine">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(transaction.value)}
                      </td>
                      <td className="tableLine">{transaction.account}</td>
                    </tr>
                  )

                  } else {
                    return []
                  }
                })}
              </>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
