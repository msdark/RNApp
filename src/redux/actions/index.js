import { NavigationActions } from 'react-navigation';

import login from '../../api/auth';
import { loginRequest, loginSuccess, loginFailed, logout } from './login';
import { retrieveSaldos } from './saldos';
import {
  retrieveOperaciones,
  retrieveCurso,
  retrieveVigente,
} from './operaciones';
import { retrieveRetenciones } from './retenciones';
import { DATA_LOADED } from '../constants';

export function navigate(routeName, params = {}) {
  return NavigationActions.navigate({ routeName, params });
}

export function dataLoaded() {
  return {
    type: DATA_LOADED,
  };
}

function retrieveData(data) {
  return dispatch => {
    Promise.all([
      dispatch(retrieveSaldos(data)),
      dispatch(retrieveOperaciones(data)),
      dispatch(retrieveRetenciones(data)),
      dispatch(retrieveCurso(data)),
      dispatch(retrieveVigente(data)),
    ])
      .then(() => {
        setTimeout(() => dispatch(logout()), 300000); // 5 minutes
        dispatch(dataLoaded());
      })
      .catch(() => {
        // TODO Log the error to somewhere
        dispatch(navigate('Home'));
      });
  };
}

export function doLogin(data) {
  return dispatch => {
    dispatch(navigate('Tabs'));
    if (data.rut !== '' && data.password !== '') {
      dispatch(loginRequest(data));
      return login(data)
        .then(response => {
          dispatch(
            loginSuccess({
              user: response,
              rut: data.rut,
              password: data.password,
            })
          );
          dispatch(retrieveData(data));
        })
        .catch(error => {
          dispatch(loginFailed(error));
          return dispatch(navigate('Home'));
        });
    }
    dispatch(loginFailed(404));
    return dispatch(navigate('Home'));
  };
}
