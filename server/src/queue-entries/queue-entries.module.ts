import { Module } from '@nestjs/common';
import { QueueEntriesController } from './queue-entries.controller';
import { QueueEntriesService } from './queue-entries.service';

@Module({
  controllers: [QueueEntriesController],
  providers: [QueueEntriesService]
})
export class QueueEntriesModule {}
