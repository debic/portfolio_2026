export interface Project {
  id:          number
  title:       string
  subtitle:    string
  description: string
  challenge?:  string
  solution?:   string
  role?:       string
  year?:       string
  duration?:   string
  tags:        string[]
  images:      string[]
  liveUrl?:    string
  githubUrl?:  string
  featured:    boolean
  column:      'left' | 'right'
}
