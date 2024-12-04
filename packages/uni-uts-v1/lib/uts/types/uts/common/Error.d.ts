/**
 * UTS错误信息对象
 * @package io.dcloud.uts
 * @origin UTSError
 */
declare class Error {
  constructor();
  constructor(message : string);
  constructor(message : string, options : UTSJSONObject);

  name : string;
  message : string;
  cause : Error | null;
}