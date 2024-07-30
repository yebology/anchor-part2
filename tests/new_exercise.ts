import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { NewExercise } from "../target/types/new_exercise";
import { expect } from "chai";

describe("new_exercise", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.NewExercise as Program<NewExercise>;

  const counter = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    await program.methods
    .initialize()
    .accounts({ counter: counter.publicKey })
    .signers([counter])
    .rpc()

    const account = await program.account.counter.fetch(counter.publicKey);
    expect(account.count.toNumber()).to.equal(0);
  });

  it("Is incremented!", async () => {
    await program.methods
    .increment()
    .accounts({ counter: counter.publicKey, user: provider.wallet.publicKey })
    .rpc()

    const account = await program.account.counter.fetch(counter.publicKey);
    expect(account.count.toNumber()).to.equal(1);
  })

  it("Is decremented!", async () => {
    await program.methods
    .decrement()
    .accounts({ counter: counter.publicKey, user: provider.wallet.publicKey })
    .rpc()

    const account = await program.account.counter.fetch(counter.publicKey);
    expect(account.count.toNumber()).to.equal(0);
  })
});
