import axios, {ResDataType} from './ajax'

type SearchOption = {
  keyword: string | null
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType
  return data;
}
// 创建问卷
export async function createQuestionServie(): Promise<ResDataType> {
  const url = `/api/question`;
  const data = (await axios.post(url)) as ResDataType
  return data;
}
// 查询问卷列表
export async function getQuestionListService(opt: Partial<SearchOption> ): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.get(url, {params: opt})) as ResDataType
  return data;
}