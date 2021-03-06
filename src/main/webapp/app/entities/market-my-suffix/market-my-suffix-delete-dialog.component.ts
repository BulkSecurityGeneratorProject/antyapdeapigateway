import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MarketMySuffix } from './market-my-suffix.model';
import { MarketMySuffixPopupService } from './market-my-suffix-popup.service';
import { MarketMySuffixService } from './market-my-suffix.service';

@Component({
    selector: 'jhi-market-my-suffix-delete-dialog',
    templateUrl: './market-my-suffix-delete-dialog.component.html'
})
export class MarketMySuffixDeleteDialogComponent {

    market: MarketMySuffix;

    constructor(
        private marketService: MarketMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.marketService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'marketListModification',
                content: 'Deleted an market'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-market-my-suffix-delete-popup',
    template: ''
})
export class MarketMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private marketPopupService: MarketMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.marketPopupService
                .open(MarketMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
