import * as UserInteractionsActions from "./user-interactions.actions";
import { all, call, put, takeLatest } from "redux-saga/effects";
import UserInteractionsActionTypes from "./user-interactions.types";
import { getHandledNetworkErrors } from "../user/user.sagas";
import UserActionsAPI from "../../apis/user-actions/api";
