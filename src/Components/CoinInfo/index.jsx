import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HistoricalChart } from '../../Config/api'
import { Cryptostate } from '../../Cryptocontext'
import "./index.css"
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { chartDays } from '../../Config/data';
import SelectedBtn from '../SelectedBtn/index';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const CoinInfo = () => {

  const [coinHistory, setCoinHistory] = useState(null)
  const [days, setDays] = useState(1)
  const { currency } = Cryptostate()
  const { id } = useParams()

  const FetchCoinHistory = async () => {
    const { data } = await axios?.get(HistoricalChart(id, days, currency))
    setCoinHistory(data?.prices)
  }

  useEffect(() => {
    FetchCoinHistory()
    //eslint-disable-next-line
  }, [currency, days])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })


  return (
    <ThemeProvider theme={darkTheme}>
      <div className="chart-container">
        <>
          {
            !coinHistory ?
              (
                <CircularProgress
                  style={{ color: 'gold' }}
                  size={250}
                  thickness={1} />
              )
              :
              (
                <Line

                  data={{
                    labels: coinHistory.map((coin) => {
                      let date = new Date(coin[0]);
                      let time =
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                          : `${date.getHours()}:${date.getMinutes()} AM`;
                      return days === 1 ? time : date.toLocaleDateString();
                    }),
                    datasets: [{
                      data: coinHistory?.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D"
                    }],
                  }}

                  options={{
                    elements: {
                      point: {
                        radius: 1
                      }
                    }
                  }}
                />
              )
          }
          <div className='btn-container'>
            {
              chartDays?.map((e) =>
                <SelectedBtn
                  children={e}
                  selected={e?.value === days}
                  onClick={() => setDays(e?.value)}
                  key={e?.value}
                >
                  {e?.label}
                </SelectedBtn>
              )
            }
          </div>
        </>
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo