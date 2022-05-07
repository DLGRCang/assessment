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
  http('/assessmentmanagement/app/user-information/personCenter', 'get', params)
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
//人员分布统计
function personDistributionStatisticalApi(params) {
  http('/assessmentmanagement/app/user-information/personDistributionStatistical', 'get', params)
}
//人事概况
function personGeneralApi(params) {
  http('/assessmentmanagement/app/user-information/personGeneral?type='+params.data.type, 'get', params)
}
//组织部门
function listztreeApi(params) {
  http('/assessmentmanagement/app/user-information/departmentZtreeList', 'get', params)
}
//部门
function departmentListApi(params) {
  http('/assessmentmanagement/app/user-information/departmentList?departmentId='+params.data.departmentId, 'get', params)
}
//部门>人
function departmentUserListApi(params) {
  http('/assessmentmanagement/app/user-information/departmentUserList?departmentId='+params.data.departmentId, 'get', params)
}
//排名
function rankApi(params) {
  http('/assessmentmanagement/app/user-information/rank?userId='+params.data.unifiedUserId+'&type='+params.data.type, 'get', params)
}
//判断角色
function judgeRolesApi(params) {
  http('/assessmentmanagement/app/user-information/judgeRoles', 'get', params)
}
//个人详情
function getUserInfoApi(params) {
  http('/assessmentmanagement/app/user-information/getUserInfo?userId='+params.data.unifiedUserId, 'get', params)
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
  reorganizeSituationApi,
  personDistributionStatisticalApi,
  personGeneralApi,
  listztreeApi,
  departmentListApi,
  departmentUserListApi,
  rankApi,
  judgeRolesApi,
  getUserInfoApi
}