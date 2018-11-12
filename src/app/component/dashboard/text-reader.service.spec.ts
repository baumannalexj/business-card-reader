import { TestBed, inject } from '@angular/core/testing';

import { TextReaderService } from './text-reader.service';

describe('TextReaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextReaderService]
    });
  });

  it('should be created', inject([TextReaderService], (service: TextReaderService) => {
    expect(service).toBeTruthy();
  }));
});
