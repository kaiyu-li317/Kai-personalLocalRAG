import Mock from 'mockjs'
const { Random } = Mock as any // Export random functions

const success = (data: any) => {
  return {
    code: 200,
    data,
    msg: 'Operation successful',
    success: true
  }
}

// Add repository
const addRepository = (req) => {
  return success(null)
}
// Edit repository
const editRepository = (req) => {
  return success(null)
}
// Delete repository
const removeRepository = (req) => {
  return success(null)
}

// Query repository list
const repositoryList = (req) => {
  return success([
    { reposId: Random.guid(), reposNm: Random.string(10), reposDesc: Random.string(100) },
    { reposId: Random.guid(), reposNm: Random.string(10), reposDesc: Random.string(100) }
  ])
}

export default {
  addRepository, editRepository, removeRepository,
  repositoryList
}