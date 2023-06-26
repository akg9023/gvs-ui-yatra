 const BASE_URL = "http://54.144.248.72:8080"
//  const BASE_URL = "http://localhost:8080"
export const GET_USER_DETAIL = BASE_URL+"/v1/hlzGlobalReg/fetchSpecefic"
export const GET_LIMITED_USER_DETAIL = BASE_URL+"/v1/hlzGlobalReg/fetchAllDevWithLimitedData"
export const GET_FULL_REG_DETAILS_BY_TXN_ID = BASE_URL+"/v1/memReg/fetchByClientTxnId"
export const GET_ALL_REG_MEM_DETAILS = BASE_URL+"/v1/memReg/fetchAllByEmail"
export const BACKEND_UPI_GATEWAY_CREATE_ORDER_URL = BASE_URL+"/v1/pay/createOrder"
export const GET_ALL_REG_MEM_ID = BASE_URL+"/v1/memReg/fetchRegMemId"
export const SAVE_MEM_LIST = BASE_URL+"/v1/memReg/saveInput"
export const GET_ALL_ROOMS = BASE_URL+"/v1/accomodation/rooms/fetchAll"

//manual
export const CALCULATE_MEM_REG_AMOUNT = BASE_URL+"/v1/manualPayment/memRegAmt"
export const PAYMENT_UPI_ID = "7870823920@paytm"
export const PAYMENT_MERCHANT_NAME = "HALDIA VOICE"
export const SAVE_PAYMENT_REQUEST= BASE_URL+"/v1/manualPayment/saveInput"

//manual Room booking Payment approval

export const FETCH_ALL_PENDING_BOOKING = BASE_URL + "/v1/room/bookings/fetchAllPendingBookings"

//members room booking list
export const FETCH_ALL_PENDING_MEMBERS = BASE_URL + "/v1/room/bookings/fetchAllPendingMembers"
export const FETCH_ALL_APPROVED_MEMBERS = BASE_URL + "/v1/room/bookings/fetchAllApprovedMembers"

//members list who has successfully registered for yatra

export const YATRA_REGISTERED_MEMBERS = BASE_URL + "/v1/memReg/successMembers"




