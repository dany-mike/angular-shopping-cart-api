import { EntityRepository, Repository } from 'typeorm';
import { Notification } from './notification.entity';

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {
  createNotification = async (body: string): Promise<Notification> => {
    const notification = await this.create({
      body,
    });

    await this.save(notification);

    return notification;
  };
}
