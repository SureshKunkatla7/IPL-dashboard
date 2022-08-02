import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    matchDetails: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getPreviousMatches()
  }

  getPreviousMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()
    const newData = {
      latestMatchDetails: fetchedData.latest_match_details,
      recentMatches: fetchedData.recent_matches,
      teamBannerUrl: fetchedData.team_banner_url,
    }

    const {latestMatchDetails} = newData

    const newLatestMatch = {
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      date: latestMatchDetails.date,
      firstInnings: latestMatchDetails.first_innings,
      id: latestMatchDetails.id,
      manOfTHeMatch: latestMatchDetails.man_of_the_match,
      matchStatus: latestMatchDetails.match_status,
      result: latestMatchDetails.result,
      secondInnings: latestMatchDetails.second_innings,
      umpires: latestMatchDetails.umpires,
      venue: latestMatchDetails.venue,
    }

    const {recentMatches} = newData

    const newRecentMatches = recentMatches.map(each => ({
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      firstInnings: each.first_innings,
      id: each.id,
      matchStatus: each.match_status,
      result: each.result,
    }))

    newData.recentMatches = newRecentMatches
    newData.latestMatchDetails = newLatestMatch
    this.setState({matchDetails: newData, isLoading: false})
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const {isLoading, matchDetails} = this.state
    const {latestMatchDetails, recentMatches, teamBannerUrl} = matchDetails
    return isLoading ? (
      <div testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      <div className={`bg-container-team-match ${id}`}>
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <h1 className="latest-name">Latest Matches</h1>
        <LatestMatch
          key={latestMatchDetails.id}
          latestMatch={latestMatchDetails}
        />
        <ul className="recent-list">
          {recentMatches.map(each => (
            <MatchCard key={each.id} recentMatchDetails={each} />
          ))}
        </ul>
      </div>
    )
  }
}

export default TeamMatches
