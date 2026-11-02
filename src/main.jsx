import { useMemo, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Heart, Menu, Minus, Plus, Search, ShoppingBag, X } from 'lucide-react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const products = [
  { id: 1, name: 'After Hours Zip Hoodie', category: 'Tops', price: 68, color: 'Washed black', badge: 'BEST SELLER', image: 'photo-1551488831-00ddcb6c6bd3', alt: 'Relaxed streetwear hoodie in a warm studio' },
  { id: 2, name: 'Static Wide-Leg Denim', category: 'Bottoms', price: 84, color: 'Vintage blue', badge: 'JUST LANDED', image: 'photo-1542272604-787c3835535d', alt: 'Blue denim jeans with a relaxed fit' },
  { id: 3, name: 'Offline Runner 02', category: 'Shoes', price: 110, color: 'Chalk / moss', badge: '', image: 'photo-1542291026-7eec264c27ff', alt: 'Retro runner sneakers in red and white' },
  { id: 4, name: 'No Signal Baby Tee', category: 'Tops', price: 38, color: 'Soft white', badge: '', image: 'photo-1521572163474-6864f9cf17ab', alt: 'Minimal white cotton t-shirt' },
  { id: 5, name: 'Side Quest Cargo', category: 'Bottoms', price: 92, color: 'Olive green', badge: 'LOW STOCK', image: 'photo-1515886657613-9f3515b0c78f', alt: 'Streetwear outfit with relaxed cargo trousers' },
  { id: 6, name: 'Lucky Charm Keychain', category: 'Extras', price: 18, color: 'Mixed metal', badge: '', image: 'photo-1611652022419-a9419f74343d', alt: 'Small silver accessories laid out on a surface' },
  { id: 7, name: 'Cloud Nine Crew', category: 'Tops', price: 72, color: 'Oat milk', badge: '', image: 'photo-1576566588028-4147f3842f27', alt: 'Comfortable heavyweight crewneck sweatshirt' },
  { id: 8, name: 'Sunday Drive Loafer', category: 'Shoes', price: 98, color: 'Espresso', badge: '', image: 'photo-1533867617858-e7b97e060509', alt: 'Classic leather loafers photographed in studio' },
]

const categories = ['Everything', 'Tops', 'Bottoms', 'Shoes', 'Extras']
const imageUrl = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

function App() {
  const [activeCategory, setActiveCategory] = useState('Everything')
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState({})
  const [favorites, setFavorites] = useState([])
  const [subscribed, setSubscribed] = useState(false)

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = activeCategory === 'Everything' || product.category === activeCategory
    const matchesSearch = `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesSearch
  }), [activeCategory, query])

  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const subtotal = products.reduce((sum, product) => sum + product.price * (cart[product.id] || 0), 0)

  function changeQuantity(id, amount) {
    setCart((current) => {
      const next = { ...current, [id]: Math.max(0, (current[id] || 0) + amount) }
      if (next[id] === 0) delete next[id]
      return next
    })
  }

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function handleSubscribe(event) {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <>
      <div className="announcement"><span>FREE SHIPPING ON ORDERS OVER $100</span><span className="announcement-dot">✳</span><span>GOOD FITS. ZERO GATEKEEPING.</span></div>
      <header className="site-header">
        <button className="icon-button mobile-menu" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Menu size={21} /></button>
        <a className="wordmark" href="#top" aria-label="Afterglow Market home">afterglow<span>®</span></a>
        <nav className={`main-nav ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#shop" onClick={() => { setActiveCategory('Everything'); setMobileMenuOpen(false) }}>Shop all</a><a href="#shop" onClick={() => { setActiveCategory('Tops'); setMobileMenuOpen(false) }}>Clothes</a><a href="#shop" onClick={() => { setActiveCategory('Shoes'); setMobileMenuOpen(false) }}>Shoes</a><a href="#story" onClick={() => setMobileMenuOpen(false)}>Our thing</a>
        </nav>
        <div className="header-actions">
          {searchOpen && <input className="search-input" autoFocus placeholder="Search the good stuff" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search products" />}
          <button className="icon-button" aria-label={searchOpen ? 'Close search' : 'Search'} onClick={() => { setSearchOpen(!searchOpen); setQuery('') }}><Search size={20} /></button>
          <button className="bag-button" aria-label={`Open bag, ${cartCount} items`} onClick={() => setCartOpen(true)}><ShoppingBag size={19} /><span>Bag</span><span className="bag-count">{cartCount}</span></button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="live-dot" /> DROP 04 / THE IN-BETWEEN</p>
            <h1>Fits for<br />the <em>plot.</em></h1>
            <p className="hero-description">Main-character energy, meet everyday comfort. Pieces that get you from the group chat to wherever the night goes.</p>
            <a className="button button-dark" href="#shop">Shop the new drop <ArrowRight size={17} /></a>
            <div className="hero-footnote"><span>01 — 08</span><span>CURATED FOR YOUR CURRENT ERA</span></div>
          </div>
          <div className="hero-image-wrap">
            <img className="hero-image" src={imageUrl('photo-1529139574466-a303027c1d8b', 1400)} alt="Streetwear look styled for the new season" />
            <div className="hero-sticker"><span>wear it<br />your way</span><ArrowUpRight size={17} /></div>
            <div className="hero-image-caption"><span>THE IN-BETWEEN COLLECTION</span><span>NEW YORK · EVERYWHERE</span></div>
          </div>
        </section>

        <section className="ticker" aria-label="Brand message"><div className="ticker-track"><span>YOUR FIT, YOUR RULES</span><span>✳</span><span>NO BAD OUTFITS, JUST BAD DAYS</span><span>✳</span><span>YOUR FIT, YOUR RULES</span><span>✳</span><span>NO BAD OUTFITS, JUST BAD DAYS</span><span>✳</span></div></section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div><p className="eyebrow">THE ROTATION</p><h2>Good stuff, <em>on repeat.</em></h2></div>
            <a className="text-link desktop-shop-link" href="#newsletter">Get drop alerts <ArrowUpRight size={16} /></a>
          </div>
          <div className="shop-controls">
            <div className="category-tabs" role="tablist" aria-label="Filter by category">
              {categories.map((category) => <button key={category} className={`category-tab ${activeCategory === category ? 'active' : ''}`} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}<span>{category === 'Everything' ? '08' : String(products.filter((product) => product.category === category).length).padStart(2, '0')}</span></button>)}
            </div>
            <span className="results-count">{visibleProducts.length} PIECES</span>
          </div>
          {visibleProducts.length ? <div className="product-grid">
            {visibleProducts.map((product, index) => <article className="product-card" key={product.id} style={{ '--delay': `${index * 55}ms` }}>
              <div className="product-image-wrap">
                <img className="product-image" src={imageUrl(product.image)} alt={product.alt} loading="lazy" />
                {product.badge && <span className={`product-badge ${product.badge === 'LOW STOCK' ? 'badge-alert' : ''}`}>{product.badge}</span>}
                <button className={`favorite-button ${favorites.includes(product.id) ? 'is-favorite' : ''}`} aria-label={favorites.includes(product.id) ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`} onClick={() => toggleFavorite(product.id)}><Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} /></button>
                <button className="quick-add" onClick={() => changeQuantity(product.id, 1)}><Plus size={16} /><span>Quick add</span></button>
              </div>
              <div className="product-info"><div><h3>{product.name}</h3><p>{product.color}</p></div><span className="product-price">${product.price}</span></div>
            </article>)}
          </div> : <div className="empty-results"><p>No pieces found for “{query}”.</p><button className="text-link" onClick={() => { setQuery(''); setActiveCategory('Everything') }}>Clear filters <ArrowRight size={15} /></button></div>}
          <a className="text-link mobile-shop-link" href="#newsletter">Get drop alerts <ArrowUpRight size={16} /></a>
        </section>

        <section className="manifesto" id="story">
          <div className="manifesto-image"><img src={imageUrl('photo-1523398002811-999ca8dec234', 1100)} alt="A curated rack of everyday clothes" loading="lazy" /><span className="image-index">FIG. 01 / YOUR EVERYDAY UNIFORM</span></div>
          <div className="manifesto-copy"><p className="eyebrow">A LITTLE ABOUT US</p><h2>Less “what are you wearing?”<br /><em>More “where’d you get that?”</em></h2><p>We make the pieces you reach for before you even check the weather. Easy layers, good denim, shoes with places to be. Thoughtfully picked, never gatekept.</p><a className="button button-outline" href="#shop">Meet your new rotation <ArrowUpRight size={16} /></a><span className="manifesto-mark">AG—04</span></div>
        </section>

        <section className="newsletter" id="newsletter"><div><p className="eyebrow">THE GROUP CHAT, BUT EMAIL</p><h2>{subscribed ? 'You’re on the list.' : 'First dibs. No weird stuff.'}</h2><p>{subscribed ? 'Watch your inbox. The good stuff is headed your way.' : 'New drops, little surprises, and 10% off your first order.'}</p></div><form className="newsletter-form" onSubmit={handleSubscribe}><label className="sr-only" htmlFor="email">Your email address</label><input id="email" type="email" placeholder="Your email address" required disabled={subscribed} /><button type="submit" aria-label="Subscribe to the newsletter" disabled={subscribed}>{subscribed ? <Check size={19} /> : <ArrowRight size={19} />}</button></form></section>
      </main>

      <footer className="site-footer"><a className="wordmark footer-wordmark" href="#top">afterglow<span>®</span></a><span className="footer-credit"><span>GOOD CLOTHES. GOOD ENERGY.</span><span>Code © 2026 Kevin Cyril Maraño, MIT license.</span></span><a className="back-top" href="#top">BACK TO TOP <ArrowDown size={14} /></a></footer>

      {cartOpen && <div className="cart-overlay" role="presentation" onClick={() => setCartOpen(false)}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag" onClick={(event) => event.stopPropagation()}><div className="cart-header"><div><p className="eyebrow">YOUR ROTATION</p><h2>Bag <span>({cartCount})</span></h2></div><button className="icon-button" aria-label="Close bag" onClick={() => setCartOpen(false)}><X size={21} /></button></div>
        {cartCount ? <><div className="cart-items">{products.filter((product) => cart[product.id]).map((product) => <div className="cart-item" key={product.id}><img src={imageUrl(product.image, 300)} alt={product.alt} /><div className="cart-item-info"><h3>{product.name}</h3><p>{product.color}</p><div className="quantity-control"><button aria-label={`Remove one ${product.name}`} onClick={() => changeQuantity(product.id, -1)}><Minus size={13} /></button><span>{cart[product.id]}</span><button aria-label={`Add one ${product.name}`} onClick={() => changeQuantity(product.id, 1)}><Plus size={13} /></button></div></div><span className="cart-item-price">${product.price * cart[product.id]}</span></div>)}</div><div className="cart-summary"><p><span>Subtotal</span><strong>${subtotal}</strong></p><span className="shipping-note">Shipping and taxes calculated at checkout.</span><button className="button button-dark checkout-button" onClick={() => setCartOpen(false)}>Continue to checkout <ArrowRight size={17} /></button><button className="continue-shopping" onClick={() => setCartOpen(false)}><ArrowLeft size={14} /> Keep looking</button></div></> : <div className="empty-cart"><ShoppingBag size={30} strokeWidth={1.3} /><h3>Your bag is taking a breather.</h3><p>Find something that feels like you.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Explore the drop <ArrowRight size={16} /></button></div>}</aside></div>}
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)