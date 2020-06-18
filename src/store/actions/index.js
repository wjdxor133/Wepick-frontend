// nav메뉴 클릭시 blue underline action
export const changeNavColor = pick => {
  return {
    type:"nav_pick",
    payload: pick
  }
}

// 로그인  action
export const changeLogin = check => {
  return {
    type:"login_check",
    payload:check
  }
}

export const kindLogin = kind => {
  return {
    type:"login_kind",
    payload:kind
  }  
}

// modal창 들어갔나 나오게할 action
export const changeModal = onoff => {
  return {
    type:"modal_onoff",
    payload:onoff
  }
}

// profile창 updown하게 할 action
export const changeProfile = updown => {
  return {
    type:"profile_updown",
    payload:updown
  }
}