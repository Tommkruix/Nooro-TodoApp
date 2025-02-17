class LogService {
  static log(message: string, ...optionalParams: never[]) {
    console.log(message, ...optionalParams);
  }

  static error(message: string, ...optionalParams: never[]) {
    console.error(message, ...optionalParams);
  }

  static warn(message: string, ...optionalParams: never[]) {
    console.warn(message, ...optionalParams);
  }

  static info(message: string, ...optionalParams: never[]) {
    console.info(message, ...optionalParams);
  }
}

export default LogService;
