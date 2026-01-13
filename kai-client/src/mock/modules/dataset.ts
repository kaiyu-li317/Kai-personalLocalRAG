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

const successPage = (data: any) => {
  return {
    data,
    pageNum: 1,
    pageSize: 10,
    pages: 13,
    total: 130
  }
}

// Query dataset list
const datasetList = (req) => {
  let data = Array.from({ length: Random.integer(5, 55) }).map((_, index) => ({
    dtsetId: Random.guid(), reposId: Random.string(10), dtsetNm: Random.string(10), dtsetTyp: 'text', idxSts: '01', fileTyp: 'pdf'
  }))
  return successPage(data)
}

export default {
  datasetList
}