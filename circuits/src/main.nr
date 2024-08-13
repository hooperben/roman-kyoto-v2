use dep::std;

use std::ec::tecurve::affine::Curve as AffineCurve;
use std::ec::tecurve::affine::Point as Gaffine;

// Returns the merkle root of the tree from the provided leaf, path indices, siblings with poseidon hash.
// this was taken from the noir_merkleroot crate (https://github.com/tomoima525/noir-merkle-root)
// fn compute_merkle_root(leaf: Field, path_indices: [Field; 8], siblings: [Field; 8]) -> Field {
//     let n = siblings.len();
//     let mut current = leaf;
//     for i in 0..n {
//         let is_right = (path_indices[i] == 1) as bool;
//         let (hash_left, hash_right) = if is_right {
//             (siblings[i], current)
//          } else {
//             (current, siblings[i])
//          };
//       current = std::hash::poseidon::bn254::hash_2([hash_left, hash_right]);
//     };
//     current
// }

fn main() {
    let bjj_affine = AffineCurve::new(
        168700,
        168696,
        Gaffine::new(
            995203441582195749578291179787384436505546430278305826713579947235728471134,
            5472060717959818805561601436314318772137091100104008585924551046643952123905
        )
    );

    // Test addition
    let p1_affine = Gaffine::new(
        17777552123799933955779906779655732241715742912184938656739573121738514868268,
        2626589144620713026669568689430873010625803728049924121243784502389097019475
    );
    let p2_affine = Gaffine::new(
        16540640123574156134436876038791482806971768689494387082833631921987005038935,
        20819045374670962167435360035096875258406992893633759881276124905556507972311
    );

    let p3_affine = bjj_affine.add(p1_affine, p2_affine);
    
    assert(
        p3_affine.eq(
            Gaffine::new(
                7916061937171219682591368294088513039687205273691143098332585753343424131937,
                14035240266687799601661095864649209771790948434046947201833777492504781204499
            )
        )
    );
}

#[test]
fn test_jub_jub() {
    main();
}
