import {describe, it, beforeEach, expect} from 'vitest'
import { AppElement, drowRectangle } from './app.element';


describe('AppElement', () => {


    // ... existing tests ...

    describe('setBackGroundImage', () => {
      let app: AppElement;
      let hostSvg: SVGElement;
      let img: { url: string; width: number; height: number };

      beforeEach(() => {
        app = new AppElement();
        hostSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        img = { url: 'http://example.com/image.jpg', width: 100, height: 200 };
      });

    it('should create an image element with correct attributes', () => {
        app.setBackGroundImage(img, hostSvg);

        const image = hostSvg.querySelector('image');
        expect(image).toBeTruthy();
        if (image) {
            expect(image.getAttribute('href')).toBe(img.url);
            expect(image.getAttribute('width')).toBe(img.width.toString());
            expect(image.getAttribute('height')).toBe(img.height.toString());
        }
    });

      it('should set correct attributes on the host SVG element', () => {
        app.setBackGroundImage(img, hostSvg);

        expect(hostSvg.getAttribute('width')).toBe(img.width.toString());
        expect(hostSvg.getAttribute('height')).toBe(img.height.toString());
        expect(hostSvg.getAttribute('viewBox')).toBe(`0 0 ${img.width} ${img.height}`);
      });

      it('should append the image element to the host SVG element', () => {
        app.setBackGroundImage(img, hostSvg);

        const image = hostSvg.querySelector('image');
        expect(image).toBeTruthy();
        expect(hostSvg.contains(image)).toBe(true);
      });
    });
  });

  describe('drowRectangle', () => {


    it('should create a rectangle element with correct attributes', () => {
      const shape = {
        type: 'rectangle',
        id: 1,
        color: 'red',
        selected: false,
        x: 10,
        y: 20,
        width: 100,
        height: 50,
      };

      //@ts-ignore
      const rectangle = drowRectangle(shape);

      expect(rectangle.tagName).toBe('rect');
      expect(rectangle.getAttribute('x')).toBe('10');
      expect(rectangle.getAttribute('y')).toBe('20');
      expect(rectangle.getAttribute('width')).toBe('100');
      expect(rectangle.getAttribute('height')).toBe('50');
      expect(rectangle.getAttribute('fill')).toBe('red');
    });
  });
