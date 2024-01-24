export class Logger {
  constructor() {}

  // 랜덤한 id생성하게
  createId() {}

  init({ platform, serviceName, logId }) {
    this.platform = platform;
    this.serviceName = serviceName;
    this.logId = logId;
  }

  // LoggerScreen사용시
  screen({ path }) {
    this.path = path;
    if (path) {
      console.log(`Logging screen information for path: ${path}`);
    } else {
      alert('screen의 path명을 지정해주세요');
    }
  }
  // LoggerClick사용시
  // click이랑 screen나누면 tags 필요 없을듯
  click({ name }) {
    this.name = name; // 어떤 버튼 클릭했는지
    if (name) {
      console.log(`Logging click information for button: ${name}`);
    } else {
      alert('click한 컴포넌트의 name을 지정해주세요.');
    }
  }

  time() {}
}
