import { SetMetadata } from '@nestjs/common';

export const AllowAdmin = () => SetMetadata('allowAdmin', true);