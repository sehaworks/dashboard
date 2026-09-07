import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import Layout from "../components/Layout/Layout.jsx";

import PrivateRoute from "./PrivateRoute";
import PermissionRoute from "./PermissionRoute";
import DefaultRedirect from "./DefaultRedirect";
import NotFoundRedirect from "./NotFoundRedirect";
import DashboardGuard from "./DashboardGuard";

// 로그인
import Login from "@pages/Login/Login.jsx";

// 대시보드
import Dashboard from "@pages/Dashboard/Dashboard.jsx";

// 회사관리
import CompanyList from "@pages/Company/CompanyList/CompanyList.jsx";
import CompanyForm from "@pages/Company/CompanyForm/CompanyForm.jsx";
import WorkplaceList from "@pages/Company/WorkPlaceList/WorkPlaceList.jsx";
import WorkplaceForm from "@pages/Company/WorkPlaceForm/WorkPlaceForm.jsx";

// 사용자관리
import UserList from "@pages/User/UserList/UserList.jsx";
import UserForm from "@pages/User/UserForm/UserForm.jsx";
import DepartmentList from "@pages/User/DepartmentList/DepartmentList.jsx";
import UserSettingagreement from "@pages/User/UserSetting/AgreementSetting/AgreementSetting.jsx";
import TypeSetting from "@pages/User/UserSetting/TypeSetting/TypeSetting.jsx";

// 방문관리
import VisitRequestList from "@pages/Visit/VisitRequestList/VisitRequestList.jsx";
import QrSendHistory from "@pages/Visit/QrSendingHistory/QrSendingHistory.jsx";
import VisitorAccessHistory from "@pages/Visit/VisitAccessHistory/VisitAccessHistory.jsx";

// 방문관리 > 환경설정
import AlimTalkSetting from "@pages/Visit/VisitSettings/AlimTalkSetting/AlimTalkSetting.jsx";
import AgreementSetting from "@pages/Visit/VisitSettings/AgreementSetting/AgreementSetting.jsx";
import VisitConditionSetting from "@pages/Visit/VisitSettings/VisitConditionSetting/VisitConditionSetting.jsx";

// 주차관리
import ParkingCCTVList from "@pages/Parking/ParkingCCTVList/ParkingCCTVList.jsx";
import ParkingInOutHistory from "@pages/Parking/ParkingInOutHistory/ParkingInOutHistory.jsx";
import ParkingCarList from "@pages/Parking/ParkingCarList/ParkingCarList.jsx";

// 스마트사원증관리
import LocationLog from "@pages/SmartBadge/LocationLog/LocationLog.jsx";
import EmergencyLog from "@pages/SmartBadge/EmergencyLog/EmergencyLog.jsx";
import SecurityAccessHistory from "@pages/SmartBadge/SecurityAccessHistory/SecurityAccessHistory.jsx";
import AlimTalkSendHistory from "@pages/SmartBadge/AlimTalkSendHistory/AlimTalkSendHistory.jsx";
import SmartBadgeSetting from "@pages/SmartBadge/SmartBadgeSetting/SmartBadgeSetting.jsx";
import SmartBadgeSettingEmergency from "@pages/SmartBadge/SmartBadgeSettingEmergency/SmartBadgeSettingEmergency.jsx";

// 근태관리
import WorkChangeHistory from "@pages/Attendance/WorkChangeHistory/WorkChangeHistory.jsx";
import WorkHistory from "@pages/Attendance/WorkHistory/WorkHistory.jsx";
import WorkMontlyHistory from "@pages/Attendance/WorkHistory/WorkMontlyHistory.jsx";
import WorkPeriodHistory from "@pages/Attendance/WorkHistory/WorkPeriodHistory.jsx";

// 식수관리
import MealBasicSetting from "@pages/Meal/MealSettings/BasicSetting/BasicSetting.jsx";
import MealAlimTalkSetting from "@pages/Meal/MealSettings/AlimTalkSetting/AlimTalkSetting.jsx";
import MealReservationList from "@pages/Meal/MealReservationList/MealReservationList.jsx";
import MealRequest from "@pages/Meal/MealRequest/MealRequest.jsx";

// 카페테리아관리
import CafeCategoryList from "@pages/Cafeteria/CafeCategoryList/CafeCategoryList.jsx";
import CafeCategoryForm from "@pages/Cafeteria/CafeCategoryForm/CafeCategoryForm.jsx";
import CafeInventoryList from "@pages/Cafeteria/CafeInventoryList/CafeInventoryList.jsx";
import CafeProductForm from "@pages/Cafeteria/CafeProductForm/CafeProductForm.jsx";
import CafeUsageHistory from "@pages/Cafeteria/CafeUsageHistory/CafeUsageHistory.jsx";
import CafeHistoryLog from "@pages/Cafeteria/CafeHistoryLog/CafeHistoryLog.jsx";
import CafeSetting from "@pages/Cafeteria/CafeSetting/CafeSetting.jsx";

// 전자명패관리
import NameTagList from "@pages/Certificate/NameTagList/NameTagList.jsx";
import CertificateTemplateForm from "@pages/Certificate/CertificateTemplateForm/CertificateTemplateForm.jsx";

// 구역관리
import AreaList from "@pages/Area/AreaList/AreaList.jsx";
import AreaForm from "@pages/Area/AreaForm/AreaForm.jsx";

import BeaconList from "@pages/Device/Beacon/BeaconList/BeaconList.jsx";
import BeaconReceiverList from "@pages/Device/Beacon/BeaconReceiverList/BeaconReceiverList.jsx";

import TabletList from "@pages/Device/Tablet/TabletList/TabletList.jsx";
import TabletForm from "@pages/Device/Tablet/TabletForm/TabletForm.jsx";

// 출입문관리 (탭 구조)
import DoorManagement from "@pages/Device/Door/DoorManagement.jsx";
import SupremaDeviceList from "@pages/Device/Door/SupremaDeviceList/SupremaDeviceList.jsx";
import DeviceStatus from "@pages/Device/Door/DeviceStatus/DeviceStatus.jsx";
import DoorListPage from "@pages/Device/Door/DoorList/DoorList.jsx";
import ScheduleList from "@pages/Device/Door/ScheduleList/ScheduleList.jsx";
import AccessLog from "@pages/Device/Door/AccessLog/AccessLog.jsx";

import OrangeList from "@pages/Device/Orange/OrangeList.jsx";

import GateBarrierList from "@pages/Device/GateBarrier/GateBarrierList/GateBarrierList.jsx";
import GateBarrierForm from "@pages/Device/GateBarrier/GateBarrierForm/GateBarrierForm.jsx";

import FanvilList from "@pages/Device/Fanvil/FanvilList/FanvilList.jsx";
import FanvilForm from "@pages/Device/Fanvil/FanvilForm/FanvilForm.jsx";

import CCTVList from "@pages/Device/CCTV/CCTVList/CCTVList.jsx";
import CCTVForm from "@pages/Device/CCTV/CCTVForm/CCTVForm.jsx";

import GatewayList from "@pages/Device/Gateway/GatewayList/GatewayList.jsx";
import GatewayForm from "@pages/Device/Gateway/GatewayForm/GatewayForm.jsx";

// 장치관리 레이아웃
import DeviceManagement from "@pages/Device/DeviceManagement/DeviceManagement.jsx";

// 설정
import AccountSetting from "@pages/Settings/AccountSetting/AccountSetting.jsx";

// 방문예약페이지
import VisitUser from "@pages/VisitUser/VisitUser.jsx";
import VisitUserAgreement from "@pages/VisitUser/VisitUserAgreement/VisitUserAgreement.jsx";
import VisitUserAgreementDetail from "@pages/VisitUser/VisitUserAgreementDetail/VisitUserAgreementDetail.jsx";
import VisitUserForm from "@pages/VisitUser/VisitUserForm/VisitUserForm.jsx";
import VisitUserComplete from "@pages/VisitUser/VisitUserComplete/VisitUserComplete.jsx";
import VisitUserProgress from "@pages/VisitUser/VisitUserProgress/VisitUserProgress.jsx";
import VisitUserQr from "@pages/VisitUser/VisitUserQr/VisitUserQr.jsx";
import VisitUserQrAgreement from "@pages/VisitUser/VisitUserQrAgreement/VisitUserQrAgreement.jsx";
import VisitUserQrAgreementDetail from "@pages/VisitUser/VisitUserQrAgreementDetail/VisitUserQrAgreementDetail.jsx";
import VisitUserApproval from "@pages/VisitUser/VisitUserApproval/VisitUserApproval.jsx";

// 동의서
import LoginAgreement from "@pages/Agreement/LoginAgreement.jsx";
import PrivacyPolicy from "@pages/Agreement/PrivacyPolicy/PrivacyPolicy.jsx";
import TermsOfService from "@pages/Agreement/TermsOfService/TermsOfService.jsx";

// 아이디 비번 찾기
import FindId from "@pages/FindIdPw/FindId/FindId.jsx";
import FindPw from "@pages/FindIdPw/FindPw/FindPw.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 로그인 */}
      <Route path="/login" element={<Login />} />

      {/* 대시보드 */}
      <Route path="dashboard" element={<Dashboard />} />

      {/* 보호 라우트 */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PermissionRoute>
              <Layout />
            </PermissionRoute>
          </PrivateRoute>
        }
      >
        {/* 기본 페이지 - 사용자 권한에 따라 첫 번째 접근 가능 메뉴로 리다이렉트 */}
        <Route index element={<DefaultRedirect />} />

        {/* 대시보드 - 마이즈 관리자(GLOBAL)만 접근 가능 */}
        <Route path="dashboard" element={<DashboardGuard />} />

        {/* =============================== */}
        {/* 회사관리 */}
        {/* =============================== */}
        <Route path="company/list" element={<CompanyList />} />
        <Route path="company/form" element={<CompanyForm />} />
        <Route path="company/workplace-list" element={<WorkplaceList />} />
        <Route path="company/workplace-form" element={<WorkplaceForm />} />

        {/* =============================== */}
        {/* 사용자관리 */}
        {/* =============================== */}
        <Route path="user/list" element={<UserList />} />
        <Route path="user/form" element={<UserForm />} />
        <Route path="user/department" element={<DepartmentList />} />
        <Route
          path="user/setting/agreement"
          element={<UserSettingagreement />}
        />
        <Route path="user/setting/type" element={<TypeSetting />} />

        {/* =============================== */}
        {/* 방문관리 */}
        {/* =============================== */}
        <Route path="visit/request" element={<VisitRequestList />} />
        <Route path="visit/qr-history" element={<QrSendHistory />} />
        <Route path="visit/access-history" element={<VisitorAccessHistory />} />

        {/* 방문관리 > 설정 */}
        <Route path="visit/setting/alimtalk" element={<AlimTalkSetting />} />
        <Route path="visit/setting/agreement" element={<AgreementSetting />} />
        <Route
          path="visit/setting/condition"
          element={<VisitConditionSetting />}
        />

        {/* =============================== */}
        {/* 스마트사원증관리 */}
        {/* =============================== */}
        <Route path="smartbadge/location-log" element={<LocationLog />} />
        <Route path="smartbadge/emergency-log" element={<EmergencyLog />} />
        <Route
          path="smartbadge/access-history"
          element={<SecurityAccessHistory />}
        />
        <Route
          path="smartbadge/alimtalk-history"
          element={<AlimTalkSendHistory />}
        />
        <Route
          path="smartbadge/setting/alimtalk"
          element={<SmartBadgeSetting />}
        />
        <Route
          path="smartbadge/setting/emergency"
          element={<SmartBadgeSettingEmergency />}
        />

        {/* =============================== */}
        {/* 주차관리 */}
        {/* =============================== */}
        <Route path="parking/cctv" element={<ParkingCCTVList />} />
        <Route path="parking/inout" element={<ParkingInOutHistory />} />
        <Route path="parking/car" element={<ParkingCarList />} />

        {/* =============================== */}
        {/* 근태관리 */}
        {/* =============================== */}
        <Route path="attendance/history" element={<WorkHistory />} />
        <Route path="attendance/monthly-history" element={<WorkMontlyHistory />} />
        <Route path="attendance/period-history" element={<WorkPeriodHistory />} />
        <Route path="attendance/change-history" element={<WorkChangeHistory />} />

        {/* =============================== */}
        {/* 식수관리 */}
        {/* =============================== */}
        <Route path="meal/setting/basic" element={<MealBasicSetting />} />
        <Route path="meal/setting/alimtalk" element={<MealAlimTalkSetting />} />
        <Route path="meal/reservation" element={<MealReservationList />} />
        <Route path="meal/request" element={<MealRequest />} />

        {/* =============================== */}
        {/* 카페테리아관리 */}
        {/* =============================== */}
        <Route path="cafeteria/category" element={<CafeCategoryList />} />
        <Route path="cafeteria/category-form" element={<CafeCategoryForm />} />
        <Route path="cafeteria/inventory" element={<CafeInventoryList />} />
        <Route path="cafeteria/product-form" element={<CafeProductForm />} />
        <Route path="cafeteria/usage" element={<CafeUsageHistory />} />
        <Route path="cafeteria/log" element={<CafeHistoryLog />} />
        <Route path="cafeteria/setting" element={<CafeSetting />} />

        {/* =============================== */}
        {/* 전자명패관리 */}
        {/* =============================== */}
        <Route path="certificate/list" element={<NameTagList />} />
        <Route path="certificate/form" element={<CertificateTemplateForm />} />

        {/* =============================== */}
        {/* 구역관리 (별도 메뉴) */}
        {/* =============================== */}
        <Route path="device/area" element={<AreaList />} />
        <Route path="device/area-form" element={<AreaForm />} />

        {/* =============================== */}
        {/* 장치관리 (2depth 사이드바) */}
        {/* =============================== */}
        <Route path="device" element={<DeviceManagement />}>
          <Route path="beacon/beaconlist" element={<BeaconList />} />
          <Route
            path="beacon/beaconreceiverlist"
            element={<BeaconReceiverList />}
          />
          <Route path="tablet" element={<TabletList />} />
          <Route path="tablet-form" element={<TabletForm />} />
          <Route path="door" element={<DoorManagement />}>
            <Route path="device-list" element={<SupremaDeviceList />} />
            <Route path="device-status" element={<DeviceStatus />} />
            <Route path="door-list" element={<DoorListPage />} />
            <Route path="schedule" element={<ScheduleList />} />
            <Route path="access-log" element={<AccessLog />} />
          </Route>
          <Route path="orange" element={<OrangeList />} />
          <Route path="barrier" element={<GateBarrierList />} />
          <Route path="barrier-form" element={<GateBarrierForm />} />
          <Route path="fanvil" element={<FanvilList />} />
          <Route path="fanvil-form" element={<FanvilForm />} />
          <Route path="cctv" element={<CCTVList />} />
          <Route path="cctv-form" element={<CCTVForm />} />
          <Route path="gateway" element={<GatewayList />} />
          <Route path="gateway-form" element={<GatewayForm />} />
        </Route>

        {/* =============================== */}
        {/* 설정 */}
        {/* =============================== */}
        <Route path="settings/account" element={<AccountSetting />} />
      </Route>
      {/* =============================== */}
      {/* 방문예약페이지 - companyId 파라미터 포함 */}
      {/* =============================== */}
      <Route path="visituser/:companyId" element={<VisitUser />} />
      <Route
        path="visituser/:companyId/agreement"
        element={<VisitUserAgreement />}
      />
      <Route
        path="visituser/:companyId/agreement/:documentId"
        element={<VisitUserAgreementDetail />}
      />
      <Route path="visituser/:companyId/form" element={<VisitUserForm />} />
      <Route
        path="visituser/:companyId/complete"
        element={<VisitUserComplete />}
      />
      <Route
        path="visituser/:companyId/progress"
        element={<VisitUserProgress />}
      />
      {/* =============================== */}
      {/* 알림톡 URL - 방문자 QR 페이지 */}
      {/* =============================== */}
      <Route path="visit/QRcode/:visitorId" element={<VisitUserQr />} />
      <Route
        path="visit/QRcode/:visitorId/agreement"
        element={<VisitUserQrAgreement />}
      />
      <Route
        path="visit/QRcode/:visitorId/agreement/:documentId"
        element={<VisitUserQrAgreementDetail />}
      />
      {/* =============================== */}
      {/* 알림톡 URL - 담당자 승인 페이지 */}
      {/* =============================== */}
      <Route
        path="visit/manager/:reservationId"
        element={<VisitUserApproval />}
      />
      {/* =============================== */}
      {/* 알림톡 URL - 기존 페이지 연결 */}
      {/* =============================== */}
      <Route path="visit/application/:companyId" element={<VisitUser />} />
      <Route path="visit/progress/:companyId" element={<VisitUserProgress />} />

      {/* =============================== */}
      {/* 약관 페이지 - 로그인 필요 */}
      {/* =============================== */}
      <Route path="agreement" element={<PrivateRoute><LoginAgreement /></PrivateRoute>} />
      <Route path="agreement/privacypolicy" element={<PrivateRoute><PrivacyPolicy /></PrivateRoute>} />
      <Route path="agreement/termsofservice" element={<PrivateRoute><TermsOfService /></PrivateRoute>} />

      {/* =============================== */}
      {/* 아이디 비번 찾기 */}
      {/* =============================== */}
      <Route path="find/findID" element={<FindId />} />
      <Route path="find/findPW" element={<FindPw />} />

      {/* Not Found - 토큰 유무에 따라 리다이렉트 */}
      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  );
}
