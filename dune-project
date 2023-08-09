(lang dune 3.8)

(name spice)

(using melange 0.1)

(package
 (name spice)
 (synopsis "")
 (description "")
 (depends
  (ocaml
   (>= 4.13.0))
  (melange
   (>= 1.0.0))))

(package
 (name ppx_spice)
 (synopsis "")
 (description "")
 (depends
  (ocaml
   (>= 4.13.0))
  (ppxlib
   (>= 0.28.0))
  (merlin :with-test)))
