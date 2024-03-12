//import Moment from 'moment'
import {I18n} from "../libs/utils/I18n";
import { WebApi } from "./WebApi";

export const $glVars = {
  i18n: new I18n(),
  data: null,
  webApi: new WebApi(),
  queryStr: ""
}