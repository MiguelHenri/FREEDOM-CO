from datetime import datetime
from models import Cart, Purchase, StoreItem, db

def cleanup_expired_reservations():
    """
    Cleans up expired reservations by updating stock quantities and removing
    expired purchases.
    """
    time_now = datetime.now(datetime.UTC)

    # Fetch expired purchases
    expired_purchases = Purchase.query.filter(
        Purchase.status == 'Pending',
        Purchase.expires_at < time_now
    ).all()

    for purchase in expired_purchases:
        # Fetch associated carts
        carts = Cart.query.filter_by(purchase_id=purchase.id).all()
        for cart in carts:
            store_item = StoreItem.query.filter_by(id=cart.item_id).first()
            if store_item:
                clean_size = cart.size.strip()
                if clean_size in store_item.size_quantity_pairs:
                    store_item.size_quantity_pairs[clean_size] += cart.quantity
                    db.session.add(store_item)

        # Delete the purchase
        db.session.delete(purchase)

    db.session.commit()