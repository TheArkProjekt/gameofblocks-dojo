use starknet::ContractAddress;
use traits::Into;
use array::SpanTrait;

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Land {
    latest_farm: u64,
    kingdom_id: u64
}

trait LandTrait {
    fn can_farm(self: Land) -> bool;
    fn generate_resource(self: Land) -> (u8, u128);
}

impl LandImpl of LandTrait {
    fn can_farm(self: Land) -> bool {
        true
    }

    fn generate_resource(self: Land) -> (u8, u128) {
        // TODO: generate random resources

        (1, 1)
    }
}

