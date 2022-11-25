export interface IImage {
  _type: string
  instrumentation: Instrumentation
  readLink: string
  webSearchUrl: string
  queryContext: QueryContext
  totalEstimatedMatches: number
  nextOffset: number
  currentOffset: number
  value: Value[]
  pivotSuggestions: PivotSuggestion[]
  relatedSearches: RelatedSearch[]
}

export interface Instrumentation {
  _type: string
}

export interface QueryContext {
  originalQuery: string
  alterationDisplayQuery: string
  alterationOverrideQuery: string
  alterationMethod: string
  alterationType: string
}

export interface Value {
  webSearchUrl: string
  name: string
  thumbnailUrl: string
  datePublished: string
  isFamilyFriendly: boolean
  contentUrl: string
  hostPageUrl: string
  contentSize: string
  encodingFormat: string
  hostPageDisplayUrl: string
  width: number
  height: number
  hostPageFavIconUrl: string
  hostPageDomainFriendlyName: string
  hostPageDiscoveredDate: string
  thumbnail: Thumbnail
  imageInsightsToken: string
  insightsMetadata: InsightsMetadata
  imageId: string
  accentColor: string
}

export interface Thumbnail {
  width: number
  height: number
}

export interface InsightsMetadata {
  pagesIncludingCount: number
  availableSizesCount: number
}

export interface PivotSuggestion {
  pivot: string
  suggestions: Suggestion[]
}

export interface Suggestion {
  text: string
  displayText: string
  webSearchUrl: string
  searchLink: string
  thumbnail: Thumbnail2
}

export interface Thumbnail2 {
  thumbnailUrl: string
}

export interface RelatedSearch {
  text: string
  displayText: string
  webSearchUrl: string
  searchLink: string
  thumbnail: Thumbnail3
}

export interface Thumbnail3 {
  thumbnailUrl: string
}
