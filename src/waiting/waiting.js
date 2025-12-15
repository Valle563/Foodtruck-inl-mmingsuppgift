import { state } from '../state/state.js'

export function renderWaiting() {
    const waitingSection = document.getElementById('waiting')
    
    waitingSection.innerHTML = `
        <div class="waiting-container">
            <div class="waiting-box">
                <div class="wonton-box">
                    <div class="logo-badge">
                        <span class="logo-text">Y Y<br>G S</span>
                    </div>
                </div>
            </div>
            
            <h2 class="waiting-title">DINA WONTONS<br>TILLAGAS!</h2>
            <p class="waiting-eta">ETA ${state.eta} MIN</p>
            <p class="waiting-order-id">#${state.orderId.toUpperCase()}</p>
            
            <button class="receipt-btn" id="receipt-btn">SE KVITTO</button>
            <button class="new-order-btn" id="new-order-btn">GÖR EN NY BESTÄLLNING</button>
        </div>
    `
}