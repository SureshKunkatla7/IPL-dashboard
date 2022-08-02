import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {isLoading: true, teamList: []}

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchedData = await response.json()
    const {teams} = fetchedData
    console.log(teams)

    const newList = teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))

    this.setState({teamList: newList, isLoading: false})
  }

  render() {
    const {isLoading, teamList} = this.state
    return (
      <div className="bg-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="card-container">
            <div className="title-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
                className="ipl-logo"
              />
              <h1 className="title-dashboard">IPL Dashboard</h1>
            </div>
            <ul className="teams-container">
              {teamList.map(each => (
                <TeamCard key={each.id} teamDetails={each} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Home
