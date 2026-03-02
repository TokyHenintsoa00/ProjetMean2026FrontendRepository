import { UserService } from "@/pages/service/user.service";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-info-compte-user',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="page-wrapper">

            <div *ngIf="loading" class="loading-state">
                <div class="spinner"></div>
                <span>Chargement...</span>
            </div>

            <div *ngIf="error && !loading" class="error-state">⚠️ {{ error }}</div>

            <div *ngIf="user && !loading" class="profile-page">

                <div class="avatar-zone">
                    <div class="avatar-wrapper">
                        <div class="avatar-ring">
                            <img *ngIf="previewUrl || user.avatar"
                                 [src]="previewUrl || (user.avatar?.url ? 'http://localhost:5000' + user.avatar.url : null)"
                                 alt="Avatar" class="avatar-img"/>
                            <div *ngIf="!previewUrl && !user.avatar" class="avatar-initials">
                                {{ user.prenom_client?.charAt(0)?.toUpperCase() }}{{ user.nom_client?.charAt(0)?.toUpperCase() }}
                            </div>
                        </div>
                        <label class="avatar-edit-btn" title="Modifier la photo">
                            <input type="file" accept="image/*" (change)="onFileChange($event)" style="display:none"/>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </label>
                    </div>

                    <div class="identity-block">
                        <h1 class="fullname">{{ user.prenom_client }} {{ user.nom_client }}</h1>
                        <div class="status-pill" [class.active]="user.is_active">
                            <span class="dot"></span>
                            {{ user.is_active ? 'Actif' : 'Inactif' }}
                        </div>
                    </div>

                    <div *ngIf="selectedFile" class="file-bar">
                        <span class="file-name">{{ selectedFile.name }}</span>
                        <button class="btn-save" (click)="savePhoto()" [disabled]="savingPhoto">
                            <span *ngIf="savingPhoto" class="btn-spinner"></span>
                            <svg *ngIf="!savingPhoto" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            {{ savingPhoto ? 'Envoi...' : 'Enregistrer' }}
                        </button>
                        <button class="btn-cancel" (click)="cancelPhoto()" [disabled]="savingPhoto">✕</button>
                    </div>

                    <!-- Message succès -->
                    <div *ngIf="successMsg" class="success-bar">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {{ successMsg }}
                    </div>

                    <!-- Message erreur upload -->
                    <div *ngIf="uploadError" class="upload-error-bar">
                        ⚠️ {{ uploadError }}
                    </div>
                </div>

                <div class="divider"></div>

                <div class="info-list">

                    <div class="info-row" style="animation-delay:0.05s">
                        <div class="row-icon">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                        </div>
                        <div class="row-content">
                            <span class="row-label">Email</span>
                            <span class="row-value">{{ user.email }}</span>
                        </div>
                    </div>

                    <div class="info-row" style="animation-delay:0.1s">
                        <div class="row-icon">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.4 2 2 0 0 1 3.56 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6.36 6.36l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                        </div>
                        <div class="row-content">
                            <span class="row-label">Téléphone</span>
                            <span class="row-value">{{ user.numero_telephone }}</span>
                        </div>
                    </div>

                    <div class="info-row" style="animation-delay:0.15s">
                        <div class="row-icon">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                        </div>
                        <div class="row-content">
                            <span class="row-label">Date de naissance</span>
                            <span class="row-value">{{ user.date_naissance | date:'dd MMMM yyyy' }}</span>
                        </div>
                    </div>

                    <div class="info-row" style="animation-delay:0.2s">
                        <div class="row-icon">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                        </div>
                        <div class="row-content">
                            <span class="row-label">Membre depuis</span>
                            <span class="row-value">{{ user.created_at | date:'dd MMMM yyyy' }}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `,
    styles: [`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .page-wrapper {
            font-family: 'DM Sans', sans-serif;
            padding: 2.5rem 1.5rem;
        }

        .loading-state {
            display: flex; flex-direction: column; align-items: center;
            gap: 1rem; margin-top: 4rem;
            color: #9ca3af; font-size: 0.85rem;
        }
        .spinner {
            width: 32px; height: 32px;
            border: 2px solid #e5e7eb;
            border-top-color: #6b7280;
            border-radius: 50%;
            animation: spin 0.75s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .error-state {
            color: #dc2626; font-size: 0.85rem;
            padding: 0.75rem 1rem;
            border: 1px solid #fecaca;
            border-radius: 10px;
            background: #fef2f2;
        }

        .profile-page {
            max-width: 420px;
            animation: fadeUp 0.45s ease both;
        }
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        .avatar-zone {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.85rem;
            margin-bottom: 2rem;
        }

        .avatar-wrapper { position: relative; width: 88px; height: 88px; }

        .avatar-ring {
            width: 88px; height: 88px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid #e5e7eb;
            background: #f3f4f6;
        }
        .avatar-img { width: 100%; height: 100%; object-fit: cover; }
        .avatar-initials {
            width: 100%; height: 100%;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Syne', sans-serif;
            font-size: 1.6rem; font-weight: 800;
            color: #6b7280; letter-spacing: 1px;
        }

        .avatar-edit-btn {
            position: absolute; bottom: 0; right: 0;
            width: 26px; height: 26px; border-radius: 50%;
            background: #ffffff; border: 1.5px solid #d1d5db;
            display: flex; align-items: center; justify-content: center;
            color: #6b7280; cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .avatar-edit-btn:hover {
            border-color: #4f46e5; color: #4f46e5; background: #eef2ff;
        }

        .identity-block { display: flex; flex-direction: column; gap: 6px; }
        .fullname {
            font-family: 'Syne', sans-serif;
            font-size: 1.4rem; font-weight: 800;
            color: #111827; letter-spacing: -0.3px; line-height: 1.2;
        }

        .status-pill {
            display: inline-flex; align-items: center; gap: 5px;
            font-size: 0.7rem; font-weight: 600; letter-spacing: 0.3px;
            color: #ef4444;
        }
        .status-pill.active { color: #16a34a; }
        .dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

        /* FILE BAR */
        .file-bar {
            display: flex; align-items: center; gap: 0.5rem;
            padding: 5px 10px;
            border: 1px solid #e5e7eb;
            border-radius: 20px; font-size: 0.75rem;
        }
        .file-name {
            color: #9ca3af; max-width: 110px;
            overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .btn-save {
            display: inline-flex; align-items: center; gap: 4px;
            background: #4f46e5; color: white;
            border: none; border-radius: 12px;
            padding: 3px 10px; font-size: 0.72rem; font-weight: 600;
            cursor: pointer; font-family: 'DM Sans', sans-serif;
            transition: background 0.2s;
        }
        .btn-save:hover:not(:disabled) { background: #4338ca; }
        .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-cancel {
            background: none; border: none;
            color: #9ca3af; cursor: pointer;
            font-size: 0.78rem; padding: 2px;
            transition: color 0.2s; line-height: 1;
        }
        .btn-cancel:hover:not(:disabled) { color: #ef4444; }
        .btn-cancel:disabled { opacity: 0.4; cursor: not-allowed; }

        /* SPINNER dans bouton */
        .btn-spinner {
            width: 10px; height: 10px;
            border: 1.5px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
            display: inline-block; flex-shrink: 0;
        }

        /* SUCCESS BAR */
        .success-bar {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 5px 12px;
            background: #f0fdf4; border: 1px solid #bbf7d0;
            border-radius: 20px; font-size: 0.75rem;
            color: #16a34a; font-weight: 600;
            animation: fadeUp 0.3s ease both;
        }

        /* UPLOAD ERROR BAR */
        .upload-error-bar {
            padding: 5px 12px;
            background: #fef2f2; border: 1px solid #fecaca;
            border-radius: 20px; font-size: 0.75rem;
            color: #dc2626; font-weight: 500;
            animation: fadeUp 0.3s ease both;
        }

        .divider {
            height: 1px; background: #f3f4f6; margin-bottom: 1.5rem;
        }

        .info-list { display: flex; flex-direction: column; }

        .info-row {
            display: flex; align-items: center; gap: 1rem;
            padding: 0.85rem 0;
            border-bottom: 1px solid #f3f4f6;
            transition: padding-left 0.2s ease;
            animation: fadeUp 0.4s ease both;
            cursor: default;
        }
        .info-row:last-child { border-bottom: none; }
        .info-row:hover { padding-left: 4px; }

        .row-icon {
            width: 32px; height: 32px; flex-shrink: 0;
            display: flex; align-items: center; justify-content: center;
            color: #9ca3af;
        }

        .row-content { display: flex; flex-direction: column; gap: 2px; }
        .row-label {
            font-size: 0.67rem; text-transform: uppercase;
            letter-spacing: 0.09em; color: #9ca3af; font-weight: 600;
        }
        .row-value { font-size: 0.88rem; color: #374151; font-weight: 500; }
    `]
})
export class InfoCompteUser implements OnInit {
    user: any = null;
    loading = true;
    error = '';
    selectedFile: File | null = null;
    previewUrl: string | null = null;
    savingPhoto = false;
    successMsg = '';
    uploadError = '';

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getUserById().subscribe({
            next: (data) => { this.user = data; this.loading = false; },
            error: (err) => {
                this.error = err.error?.message || 'Erreur lors du chargement du profil';
                this.loading = false;
            }
        });
    }

    onFileChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.selectedFile = input.files[0];
            this.successMsg = '';
            this.uploadError = '';
            const reader = new FileReader();
            reader.onload = (e) => { this.previewUrl = e.target?.result as string; };
            reader.readAsDataURL(this.selectedFile);
        }
    }

    savePhoto(): void {
        if (!this.selectedFile || this.savingPhoto) return;

        const formData = new FormData();
        formData.append('photo_user', this.selectedFile); // ← nom exact attendu par multer

        this.savingPhoto = true;
        this.uploadError = '';

        this.userService.updateAvatar(formData).subscribe({
            next: (res) => {
                this.user.avatar = res.avatar;       // objet { filename, url, size, mimetype }
                this.savingPhoto = false;
                this.selectedFile = null;
                // previewUrl reste pour afficher la nouvelle photo localement
                this.successMsg = 'Photo mise à jour !';
                setTimeout(() => this.successMsg = '', 3000);
            },
            error: (err) => {
                this.uploadError = err.error?.message || 'Erreur lors de l\'upload';
                this.savingPhoto = false;
            }
        });
    }

    cancelPhoto(): void {
        this.selectedFile = null;
        this.previewUrl = null;
        this.uploadError = '';
    }
}