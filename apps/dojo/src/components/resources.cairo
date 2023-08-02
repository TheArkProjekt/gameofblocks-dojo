#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Resource {
    resource_type: u8,
    balance: u128
}
