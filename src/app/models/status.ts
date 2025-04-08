export enum DeliveryStatus {
    IN_PROGRESS = 'in_progress',           // В процессе сборки
    WAITING_FOR_STOCK = 'waiting_for_stock', // Ждёт поступлений
    IN_DELIVERY = 'in_delivery',           // В доставке
    CANCELLED = 'cancelled',               // Отменён
    DELIVERED = 'delivered',               // Доставлен
}
export const DeliveryStatusLabels: Record<DeliveryStatus, string> = {
    [DeliveryStatus.IN_PROGRESS]: 'В процессе сборки',
    [DeliveryStatus.WAITING_FOR_STOCK]: 'Ждёт поступлений',
    [DeliveryStatus.IN_DELIVERY]: 'В доставке',
    [DeliveryStatus.CANCELLED]: 'Отменён',
    [DeliveryStatus.DELIVERED]: 'Доставлен',
};
// console.log(DeliveryStatusLabels[DeliveryStatus.IN_DELIVERY]); // → В доставке