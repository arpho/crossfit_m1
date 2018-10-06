import { ItemModule } from './item-module';

describe('ItemModuleModule', () => {
  let itemModuleModule: ItemModule;

  beforeEach(() => {
    itemModuleModule = new ItemModule();
  });

  it('should create an instance', () => {
    expect(itemModuleModule).toBeTruthy();
  });
});
