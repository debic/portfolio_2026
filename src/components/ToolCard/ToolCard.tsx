import './ToolCard.css'

interface ToolCardProps {
  category:   string
  tools?:     string[]
  colorLeft:  string
  colorRight: string
}

function ToolCard({ category, tools = [], colorLeft, colorRight }: ToolCardProps): JSX.Element {
  return (
    <article className="tcard" style={{ background: colorLeft }}>
      <div className="tcard__main">
        <h3 className="tcard__category">{category}</h3>
        <ul className="tcard__tools">
          {tools.map(tool => <li key={tool} className="tcard__tool">{tool}</li>)}
        </ul>
        <div className="tcard__icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>
      <div className="tcard__accent" style={{ background: colorRight }} />
    </article>
  )
}

export default ToolCard
