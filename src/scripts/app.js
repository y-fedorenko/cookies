'use strict';

const mainDialog = document.querySelector('#dialog-one');
const settingsDialog = document.querySelector('#dialog-two');
const acceptButton = document.querySelector('#btn-accept');
const settingsButton = document.querySelector('#btn-settings');
const saveSettingsButton = document.querySelector('#btn-save-settings');
const settingsList = document.querySelectorAll('#dialog-two input');

// cookies functions
function setCookie(name, value, validSeconds) {
  const date = new Date();
  date.setTime(date.getTime() + validSeconds * 1000);
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  setCookie(name, '', -1);
}

function logCookies() {
 if (document.cookie.length) {
  console.log(`Your browser: ${getCookie('Browser')}`);
  console.log(`Your operating system: ${getCookie('OperatingSystem')}`);
  console.log(`Your screen width: ${getCookie('ScreenWidth')}`);
  console.log(`Your screen height: ${getCookie('ScreenHeight')}`);  
  }
}
//browser info functions
function getBrowser() {
  let browserName;
  if (navigator.userAgent.indexOf("OPR") !== -1) 
      browserName = "Opera";
    else if (navigator.userAgent.indexOf("Edg") !== -1) 
      browserName = "Microsoft Edge";
    else if (navigator.userAgent.indexOf("MSIE") !== -1) 
      browserName = "Microsoft Internet Explorer";
    else if (navigator.userAgent.indexOf("Chrome") !== -1) 
      browserName = "Chrome";
    else if (navigator.userAgent.indexOf("Safari") !== -1) 
      browserName = "Safari";
    else if (navigator.userAgent.indexOf("Firefox") !== -1) 
      browserName = "Firefox";
  if ('brave' in navigator) browserName = "Brave";

  return browserName;
}

function getOS() {
  const userAgent = navigator.userAgent;
  let opSys = '';
  if (userAgent.includes("Windows")) 
      opSys = "Windows";
    else if (userAgent.includes("Mac OS")) 
      opSys = "Mac OS";
    else if (userAgent.includes("Linux")) 
      opSys = "Linux-based system.";
    else if (userAgent.includes("Android")) 
      opSys = "Android";
    else if (userAgent.includes("iOS")) 
      opSys = "iOS";
  else opSys = "Unable to determine.";

  return opSys;
} 

function getWindowWidth() {
  return window.innerWidth;
}

function getWindowHeight() {
  return window.innerHeight;
}

// main logic

function cookieCheck() {
  if (!document.cookie) {
    mainDialog.showModal();
  }
  else {
    logCookies();
  }
}

window.addEventListener('load', cookieCheck);

function acceptCookies() {
const keys = ['Browser', 'OperatingSystem', 'ScreenWidth', 'ScreenHeight'];
const values = [getBrowser(), getOS(), getWindowWidth(), getWindowHeight()];
settingsList.forEach((input, index) => {
  input.checked ? setCookie(keys[index], values[index], 15) : setCookie(keys[index], 'rejected', 15)
})

}

acceptButton.addEventListener('click', () => {
  acceptCookies();
  mainDialog.close();
  console.log('All cookies accepted');
});

settingsButton.addEventListener('click', () => {
  mainDialog.close();
  settingsDialog.showModal();
})

saveSettingsButton.addEventListener('click', () => {
  settingsDialog.close();
  acceptCookies();
})