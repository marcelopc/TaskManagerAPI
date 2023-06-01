export interface CreateTaskDto {
  title: string
  description: string
}
export interface QueryParamsSearchTask {
  title?: string
  completed?: string
  createdAfter?: string
  createdBefore?: string
  userId?: string
}
