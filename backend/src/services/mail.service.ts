export async function sendOrderConfirmation(to: string, orderId: number, total: number) {
  console.log(`[order-email] to=${to} orderId=${orderId} total=${total}`);
}
