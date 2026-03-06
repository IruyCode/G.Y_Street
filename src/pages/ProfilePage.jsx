import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  LogOut,
  User,
  Mail,
  Calendar,
  Edit2,
  ChevronLeft,
  CheckCircle,
  X,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';
import { formatDate, getInitials } from '../utils/helpers';
import Button from '../components/common/Button';
import { updateUserProfile } from '../services/authService';
import { profileUpdateSchema, passwordResetSchema } from '../schemas/authSchemas';
import { getItem, setItem } from '../services/storageService';
import { STORAGE_KEYS } from '../utils/constants';
import { hashPassword, verifyPassword } from '../utils/helpers';

export const ProfilePage = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [pwMode, setPwMode] = useState(false);
  const [toast, setToast] = useState(null);

  const [nameForm, setNameForm] = useState({ name: user?.name || '' });
  const [nameErrors, setNameErrors] = useState({});
  const [nameLoading, setNameLoading] = useState(false);

  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  const [pwErrors, setPwErrors] = useState({});
  const [pwLoading, setPwLoading] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleNameSave = async (e) => {
    e.preventDefault();
    const result = profileUpdateSchema.safeParse(nameForm);
    if (!result.success) {
      const errs = {};
      result.error.errors.forEach((err) => { errs[err.path[0]] = err.message; });
      setNameErrors(errs);
      return;
    }

    setNameLoading(true);
    try {
      const updated = updateUserProfile(user.id, { name: nameForm.name });
      updateUser(updated);
      setEditMode(false);
      setNameErrors({});
      showToast('Nome atualizado com sucesso!');
    } catch (err) {
      setNameErrors({ form: err.message });
    } finally {
      setNameLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const result = passwordResetSchema.safeParse(pwForm);
    if (!result.success) {
      const errs = {};
      result.error.errors.forEach((err) => { errs[err.path[0]] = err.message; });
      setPwErrors(errs);
      return;
    }

    setPwLoading(true);
    try {
      // Get the full user with password from DB
      const users = getItem(STORAGE_KEYS.USERS_DB) || [];
      const fullUser = users.find((u) => u.id === user.id);
      if (!fullUser) throw new Error('Utilizador não encontrado.');

      const isCorrect = verifyPassword(pwForm.currentPassword, fullUser.password);
      if (!isCorrect) throw new Error('Palavra-passe atual incorreta.');

      // Update password
      const idx = users.findIndex((u) => u.id === user.id);
      users[idx].password = hashPassword(pwForm.newPassword);
      setItem(STORAGE_KEYS.USERS_DB, users, false);

      setPwForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setPwErrors({});
      setPwMode(false);
      showToast('Palavra-passe alterada com sucesso!');
    } catch (err) {
      setPwErrors({ form: err.message });
    } finally {
      setPwLoading(false);
    }
  };

  const inputClass = (err) =>
    `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
      err ? 'border-red-400' : 'border-gray-300'
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">G.Y Street</h1>
                <p className="text-xs text-gray-500">Perfil</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to={ROUTES.DASHBOARD} className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Button variant="danger" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-40 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {toast.message}
        </div>
      )}

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Avatar & Name Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-5">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary-600 text-white text-2xl font-bold flex-shrink-0">
              {getInitials(user?.name)}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-gray-900 truncate">{user?.name}</h2>
              <p className="text-gray-500 text-sm truncate">{user?.email}</p>
              <p className="text-xs text-gray-400 mt-1">
                Membro desde {user?.createdAt ? formatDate(user.createdAt) : '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-600" />
              Informações Pessoais
            </h3>
            {!editMode && (
              <button
                onClick={() => { setNameForm({ name: user?.name || '' }); setEditMode(true); }}
                className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Editar
              </button>
            )}
          </div>

          {editMode ? (
            <form onSubmit={handleNameSave} className="space-y-4">
              {nameErrors.form && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  {nameErrors.form}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  value={nameForm.name}
                  onChange={(e) => setNameForm({ name: e.target.value })}
                  className={inputClass(nameErrors.name)}
                  placeholder="Nome completo"
                />
                {nameErrors.name && <p className="text-red-500 text-xs mt-1">{nameErrors.name}</p>}
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="secondary" className="flex-1" onClick={() => { setEditMode(false); setNameErrors({}); }} disabled={nameLoading}>
                  <X className="w-4 h-4 mr-1" />
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" className="flex-1" disabled={nameLoading}>
                  {nameLoading ? 'A guardar...' : 'Guardar'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Nome</p>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Membro desde</p>
                  <p className="font-medium text-gray-900">
                    {user?.createdAt ? formatDate(user.createdAt) : '—'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Password Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary-600" />
              Segurança
            </h3>
            {!pwMode && (
              <button
                onClick={() => setPwMode(true)}
                className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Alterar senha
              </button>
            )}
          </div>

          {pwMode ? (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              {pwErrors.form && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  {pwErrors.form}
                </div>
              )}
              {[
                { key: 'currentPassword', label: 'Palavra-passe atual', placeholder: '••••••••' },
                { key: 'newPassword', label: 'Nova palavra-passe', placeholder: '••••••••' },
                { key: 'confirmNewPassword', label: 'Confirmar nova palavra-passe', placeholder: '••••••••' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type="password"
                    value={pwForm[key]}
                    onChange={(e) => setPwForm((prev) => ({ ...prev, [key]: e.target.value }))}
                    className={inputClass(pwErrors[key])}
                    placeholder={placeholder}
                  />
                  {pwErrors[key] && <p className="text-red-500 text-xs mt-1">{pwErrors[key]}</p>}
                </div>
              ))}
              <div className="flex gap-3">
                <Button type="button" variant="secondary" className="flex-1" onClick={() => { setPwMode(false); setPwErrors({}); setPwForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' }); }} disabled={pwLoading}>
                  <X className="w-4 h-4 mr-1" />
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" className="flex-1" disabled={pwLoading}>
                  {pwLoading ? 'A guardar...' : 'Alterar senha'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Lock className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Palavra-passe</p>
                <p className="font-medium text-gray-900">••••••••</p>
              </div>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
          <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Zona de Perigo
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Ao terminar sessão, será redirecionado para a página de login.
          </p>
          <Button variant="danger" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Terminar Sessão
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
