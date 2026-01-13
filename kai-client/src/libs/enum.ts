export const THEME_TYPE_KEY = 'theme'
export const THEME_COLOR_KEY = 'color'
export const TEME_NAVIGATION_KEY = 'navigation'
export const DEFAULT_THEME_TYPE = 'dark'
export const DEFAULT_THEME_COLOR = '#6366f1'
export const DEFAULT_THEME_NAVIGATION = 'default'
export const CURRENT_REPOS_ID_KEY = 'current_repos_id'

// Model preference parameter code
export const SYSTEM_MODEL_PREFERENCE_PARAM_CODE = 'model_preference'

// File type icons
export const FILE_TYPE_ICON_MAP = {
  pdf: 'iconfont-kb icon-pdf1',
  txt: 'iconfont-kb icon-txt1',
  docx: 'iconfont-kb icon-word1',
  md: 'iconfont-kb icon-markdown',
  html: 'iconfont-kb icon-html5',
  dcmt: 'iconfont-kb icon-document',
  pptx: 'iconfont-kb icon-ppt1',
  mp4: 'iconfont-kb icon-video',
  avi: 'iconfont-kb icon-video',
  mkv: 'iconfont-kb icon-video',
  mov: 'iconfont-kb icon-video',
  wmv: 'iconfont-kb icon-video',
  flv: 'iconfont-kb icon-video',
  webm: 'iconfont-kb icon-video',
  mp3: 'iconfont-kb icon-audio',
  wav: 'iconfont-kb icon-audio',
  ogg: 'iconfont-kb icon-audio',
  flac: 'iconfont-kb icon-audio',
  link: 'iconfont-kb icon-link1',
  csv: 'iconfont-kb icon-csv',
  xlsx: 'iconfont-kb icon-excel',
  xls: 'iconfont-kb icon-excel'
}

// Team member roles
export const AUTH_TEAM_ROLE_TYPE = {
  creator: 'Creator',
  manager: 'Admin',
  member: 'Member'
}
// Permission types
export const COMMON_AUTH_RANGE_TYPE = {
  prvt: 'Private', // Private - only visible to self
  team: 'Team only', // Team - only visible to team
  pblc: 'Public' // Public - visible to everyone
}
// Operation permission types
export const COMMON_AUTH_OPTION_TYPE = {
  visit: 'Access',
  alter: 'Modify'
}
// Dataset index status types
export const DATASET_INDEX_STATUS_TYPE = {
  nobd: 'No build',
  new: 'New',
  order: 'Queued',
  index: 'Indexing',
  ready: 'Ready',
  error: 'Index failed'
}

// Dataset index types
export const DATASET_INDEX_TYPE = {
  index: { label: 'Index', value: 'index', icon: 'iconfont-kb icon-dataset1' },
  precis: { label: 'Summary', value: 'precis', icon: 'iconfont-kb icon-document' },
  qanswer: { label: 'Q&A', value: 'qanswer', icon: 'iconfont-kb icon-qa' },
  triplet: { label: 'Graph', value: 'triplet', icon: 'iconfont-kb icon-triplet1' }
}

// Dataset enable status types
export const DATASET_ENABLE_STATUS_TYPE = {
  enb: 'Enabled',
  une: 'Disabled'
}

// Document types
export const DOCUMENT_TYPE = {
  md: 'Markdown',
  rt: 'Rich Text'
}

// Flow node attribute value source: var - variable reference, ipt - manual input, slt - manual selection, aut - auto set
export const NODE_ATTR_VALUE_SOURCE_TYPE = {
  var: { label: 'Variable reference', value: 'var', icon: 'iconfont-kb icon-variable' },
  ipt: { label: 'Manual input', value: 'ipt', icon: 'iconfont-kb icon-input' },
  slt: { label: 'Manual selection', value: 'slt', icon: 'iconfont-kb icon-select' },
  aut: { label: 'Auto set', value: 'aut', icon: 'iconfont-kb icon-autoset' }
}

// Flow node attribute value data types
export const NODE_ATTR_VALUE_DATA_TYPE = {
  string: { label: 'Text', value: 'string', icon: 'iconfont-kb icon-text' },
  text: { label: 'Paragraph', value: 'text', icon: 'iconfont-kb icon-document' },
  number: { label: 'Number', value: 'number', icon: 'iconfont-kb icon-number' },
  selection: { label: 'Dropdown', value: 'selection', icon: 'iconfont-kb icon-select' },
  // custom: { label: 'Custom variable', value: 'custom', icon: 'iconfont-kb icon-variable1' },
  // json: { label: 'JSON string', value: 'json', icon: 'iconfont-kb icon-codenotequalvariant' }
}

// App release status
export const APPINFO_RELEASE_STATUS = {
  rlsed: {
    label: 'Released', value: 'rlsed'
  },
  unrlse: {
    label: 'Not released', value: 'unrlse'
  }
}

// Condition branch types
// Is empty, not empty, equals, not equals, contains, not contains, starts with, ends with, greater than, greater than or equal, less than, less than or equal, length equals, length not equals, length greater than, length greater than or equal, length less than, length less than or equal
export const NODE_ATTR_CONDITION_TYPE = {
  null: { label: 'Is empty', value: 'null' },
  nnull: { label: 'Not empty', value: 'nnull' },
  eq: { label: 'Equals', value: 'eq' },
  neq: { label: 'Not equals', value: 'neq' },
  in: { label: 'Contains', value: 'in' },
  nin: { label: 'Not contains', value: 'nin' },
  stw: { label: 'Starts with', value: 'stw' },
  edw: { label: 'Ends with', value: 'edw' },
  gt: { label: 'Greater than', value: 'gt' },
  gte: { label: 'Greater than or equal', value: 'gte' },
  lt: { label: 'Less than', value: 'lt' },
  lte: { label: 'Less than or equal', value: 'lte' },
  leneq: { label: 'Length equals', value: 'leneq' },
  lenneq: { label: 'Length not equals', value: 'lenneq' },
  lengt: { label: 'Length greater than', value: 'lengt' },
  lengte: { label: 'Length greater than or equal', value: 'lengte' },
  lenlt: { label: 'Length less than', value: 'lenlt' },
  lenlte:{ label: 'Length less than or equal', value: 'lenlte' }
}

// Model types
export const LLM_MODEL_TYPE = {
  llm: { label: 'LLM', value: 'llm' },
  'text-embedding': { label: 'TEXT-EMBEDDING', value: 'text-embedding' },
  tts: { label: 'TTS', value: 'tts' },
  rerank: { label: 'RERANK', value: 'rerank' },
  speech2text: { label: 'SPEECH2TEXT', value: 'speech2text' }
}