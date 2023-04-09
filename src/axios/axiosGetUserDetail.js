import axios from "axios";
import { GET_USER_DETAIL } from "../constants/apiConstant";

export default async (id) => {
  return await axios.post(GET_USER_DETAIL+"/"+id);
};