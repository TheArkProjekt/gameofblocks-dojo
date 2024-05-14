use starknet::ContractAddress;
use traits::Into;
use array::SpanTrait;

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Kingdom {
    kingdom_id: u32
}

trait KingdomTrait {
    fn get_land_id(self: Kingdom, x_position: u8, y_position: u8) -> u32;
}

impl KingdomImpl of KingdomTrait {
    fn get_land_id(self: Kingdom, x_position: u8, y_position: u8) -> u32 {
        0
    }
}
