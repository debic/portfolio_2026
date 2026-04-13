import ToolCard from '../ToolCard/ToolCard'
import './ToolsSection.css'

interface ToolGroup {
  id:         number
  category:   string
  tools:      string[]
  colorLeft:  string
  colorRight: string
}

const TOOLS: ToolGroup[] = [
  { id: 1, category: 'Frontend',               tools: ['JavaScript', 'TypeScript', 'React', 'HTML, CSS, Sass'], colorLeft: '#2D1060', colorRight: '#5B21B6' },
  { id: 2, category: 'Backend',                tools: ['Node.js', 'Express'],                                    colorLeft: '#5B21B6', colorRight: '#7C3AED' },
  { id: 3, category: 'CMS / Website Builders', tools: ['Shopify', 'WordPress', 'Wix (Velo, and JavaScript)'],   colorLeft: '#7C3AED', colorRight: '#9333EA' },
]

function ToolsSection(): JSX.Element {
  return (
    <section className="tools-section" id="tools">
      <div className="tools-section__header">
        <h2 className="tools-section__title">Tools I Manage</h2>
        <p className="tools-section__subtitle">
          Lorem ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>
      <div className="tools-section__grid">
        {TOOLS.map(t => (
          <ToolCard
            key={t.id}
            category={t.category}
            tools={t.tools}
            colorLeft={t.colorLeft}
            colorRight={t.colorRight}
          />
        ))}
      </div>
    </section>
  )
}

export default ToolsSection
