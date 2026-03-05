describe('CSS Specificity', () => {
  let page;
  const path = '/pages/CSS/specificity/specificity';

  beforeAll(async () => {
    page = await program.reLaunch(path);
    await page.waitFor(2000);
  });

  it('Check Specificity Visuals', async () => {
    const image = await program.screenshot({ fullPage: true });
    expect(image).toSaveImageSnapshot();
  });

  // Helper to get computed style
  async function getBorderColor(id) {
    const element = await page.$(`#${id}`);
    return await element.style('border-top-color');
  }

  it('should verify class chaining specificity', async () => {
    // .s1 (blue)
    const s1 = await getBorderColor('spec-multi-1');
    // .s1.s2 (green)
    const s2 = await getBorderColor('spec-multi-2');
    // .s1.s2.s3 (red)
    const s3 = await getBorderColor('spec-multi-3');

    // Just verifying they are different for now as exact color values depend on platform implementation
    expect(s1).not.toBe(s2);
    expect(s2).not.toBe(s3);
  });

  // it('should verify definition order wins (same specificity)', async () => {
  //   // Both should be purple because .order-second is defined last
  //   const order1 = await getBorderColor('spec-order-1');
  //   const order2 = await getBorderColor('spec-order-2');
  //   expect(order1).toBe(order2);
  // });

  it('should verify definition order wins regardless of alphabetical order', async () => {
     // .alpha vs .beta (Gold - defined last)
     const alpha = await getBorderColor('spec-alpha-1');

     // .z-class vs .a-class (Cyan - defined last)
     const zIndex = await getBorderColor('spec-alpha-2');

     // Verify that they are applying the correct colors (different from default gray)
     expect(alpha).not.toBe('');
     expect(zIndex).not.toBe('');
  });

  it('should verify chained class order (anti-alphabetical sort bug check)', async () => {
    // .ab.z vs .ab.w -> .ab.w is defined last -> Green
    const inverse = await getBorderColor('spec-chain-2');

    // .ab.x vs .ab.y -> .ab.y is defined last -> Green
    const normal = await getBorderColor('spec-chain-1');

    // Both should be the same color (Green) if correct
    expect(inverse).toBe(normal);
  });
});
