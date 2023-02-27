import { CustomeModule } from './custome.module';

describe('CustomeModule', () => {
  let customeModule: CustomeModule;

  beforeEach(() => {
    customeModule = new CustomeModule();
  });

  it('should create an instance', () => {
    expect(customeModule).toBeTruthy();
  });
});
