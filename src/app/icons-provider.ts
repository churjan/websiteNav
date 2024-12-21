import { provideNzIcons } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { HomeOutline, PlusOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [HomeOutline, PlusOutline];
const iconsProvider = provideNzIcons(icons);
export { iconsProvider };
