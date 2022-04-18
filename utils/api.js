import { http } from './http';
//登录
function signApi(params) {
  http('/assessmentmanagement/wechat-miniapp/sign/default', 'post', params)
}
//授权
function updatePhoneApi(params) {
  http('/assessmentmanagement/app/miniapp/update-phone', 'put', params)
}
//上传图片
function uploadimageApi(params) {
  http('/assessmentmanagement/app/file/uploadimage', 'post', params)
}
//上传图片
function listallbyparentidApi(params) {
  http('/assessmentmanagement/app/data/listallbyparentid/'+params.data.listallbyparentid, 'get', params)
}
//注册
function saveApi(params) {
  http('/assessmentmanagement/app/user-information/save', 'post', params)
}
//指标
function listbyparentidApi(params) {
  http('/assessmentmanagement/app/indicators/listbyparentid/'+params.data.indicatorsId + (params.data.indicatorsType === undefined ? '':'?indicatorsType='+params.data.indicatorsType), 'get', params)
}
//年度列表
function annualApi(params) {
  http('/assessmentmanagement/app/annual/list', 'get', params)
}
//上报记录
function reportRecordApi(params) {
  http('/assessmentmanagement/app/report-record/save', 'post', params)
}
//填报历史
function reportRecordListApi(params) {
  http('/assessmentmanagement/app/report-record/list?reportState='+params.data.reportState+'&annualId='+params.data.annualId+'&indicatorsThirdId='+params.data.indicatorsThirdId, 'get', params)
}
//上报记录修改
function updatereportrecordApi(params) {
  http('/assessmentmanagement/app/report-record/updatereportrecord/'+params.data.reportRecordId, 'put', params)
}

//个人信息回显
function userInformationApi(params) {
  http('/assessmentmanagement/app/user-information/get', 'get', params)
}
//个人信息修改
function updateuserinformationApi(params) {
  http('/assessmentmanagement/app/user-information/updateuserinformation/'+params.data.userInformationId, 'put', params)
}
//工作待办
function listpageApi(params) {
  http('/assessmentmanagement/app/project/list?projectStatus='+params.data.projectStatus+'&keywords='+params.data.keywords, 'get', params)
}
//工作待办详情
function projectGetApi(params) {
  http('/assessmentmanagement/app/project/get/'+params.data.projectId, 'get', params)
}
//办理情况说明
function couplebackApi(params) {
  http('/assessmentmanagement/app/project/coupleback/'+params.data.projectId+'/'+params.data.environmentalManagement+'/'+params.data.environmentalManagementPicture, 'put', params)
}
//整改情况说明
function reorganizeSituationApi(params) {
  http('/assessmentmanagement/app/project/reorganizeSituation/'+params.data.projectId+'/'+params.data.reorganizeSituation+'/'+params.data.reorganizeSituationPicture, 'put', params)
}

export default { // 暴露接口
  signApi,
  updatePhoneApi,
  uploadimageApi,
  listallbyparentidApi,
  saveApi,
  listbyparentidApi,
  annualApi,
  reportRecordApi,
  reportRecordListApi,
  updatereportrecordApi,
  listpageApi,
  projectGetApi,
  userInformationApi,
  updateuserinformationApi,
  couplebackApi,
  reorganizeSituationApi
}