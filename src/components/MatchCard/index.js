import './index.css'

const MatchCard = props => {
  const {recentMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    result,
    matchStatus,
  } = recentMatchDetails
  const classAdd = matchStatus === 'Won' ? 'won' : 'lost'

  return (
    <li className="recent-item">
      <img
        src={competingTeamLogo}
        className="recent-logo"
        alt={`competing team ${competingTeam}`}
      />
      <p className="team-name">{competingTeam}</p>
      <p className="match-result">{result}</p>
      <p className={`match-status ${classAdd}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
