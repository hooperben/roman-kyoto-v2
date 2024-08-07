import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { poseidonContract } from "circomlibjs";
import { AbiCoder, parseEther } from "ethers";
import { readFileSync } from "fs";
import { ethers } from "hardhat";
import { resolve } from "path";
import { ensurePoseidon } from "../helpers/poseidon";

describe("AssetShield Testing", function () {
  let Deployer: SignerWithAddress;
  let Withdrawer: SignerWithAddress;
  let Runner: SignerWithAddress;

  let noir: Noir;
  let backend: BarretenbergBackend;

  const abi = new AbiCoder();

  before(async () => {
    [Deployer, Withdrawer, Runner] = await ethers.getSigners();
    // Firstly, we deploy all our of contracts
    // we need to deploy the poseidon hasher contract for the MerkleTreeWithHistory contract
    const hasherAbi = poseidonContract.generateABI(2);
    const HasherFactory = new ethers.ContractFactory(
      hasherAbi,
      poseidonContract.createCode(2),
      Deployer,
    );
    const tx = await HasherFactory.deploy();
    await tx.waitForDeployment();
    const _hasher = await tx.getAddress();

    // next, we deploy our prover contract
    const UltraVerifier = await ethers.getContractFactory("UltraVerifier");
    const ultraVerifier = await UltraVerifier.deploy();
    await ultraVerifier.waitForDeployment();
    const _verifer = await ultraVerifier.getAddress();

    // next we initialise our Noir libraries to generate proofs
    const circuitFile = readFileSync(
      resolve("circuits/target/circuits.json"),
      "utf-8",
    );
    const circuit = JSON.parse(circuitFile);

    backend = new BarretenbergBackend(circuit);
    noir = new Noir(circuit);

    // initialise our poseidon library
    await ensurePoseidon();
  });

  describe("AssetShield User Flow Testing", function () {});
});
