export async function createEvent(input: any) {
  // Simulate async deployment
  await new Promise((r) => setTimeout(r, 1000))
  return { ok: true, id: "evt-" + Math.floor(Math.random() * 10000) }
}
